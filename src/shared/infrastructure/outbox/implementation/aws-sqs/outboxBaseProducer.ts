import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import IOutboxProducer from '../../outboxProducer';
import sqsClient from './sqsClient';
import OutboxMessage from '../../../../domain/outbox/outboxMessage';
import OutboxMessageMapper from '../../../../domain/outbox/mappers/outboxMessageMapper';

export default abstract class OutboxBaseProducer implements IOutboxProducer<OutboxMessage> {
  private sqsClient: SQSClient;

  protected abstract queueUrl: string;

  constructor() {
    this.sqsClient = sqsClient;
  }

  async produce(outboxMessage: OutboxMessage): Promise<void> {
    console.info(`[${outboxMessage.eventId} EVENT] Producing message`);
    const command = new SendMessageCommand({
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(OutboxMessageMapper.toPersistence(outboxMessage)),
      DelaySeconds: Number(0)
    });

    const response = await this.sqsClient.send(command);
    console.info('SQS Message produced successfully:', response.MessageId);
  }
}
