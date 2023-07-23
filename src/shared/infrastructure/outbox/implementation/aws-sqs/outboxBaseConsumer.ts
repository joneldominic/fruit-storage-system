import { Message } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';
import IOutboxConsumer from '../../outboxConsumer';
import sqsClient from './sqsClient';
import IDomainEvent from '../../../../domain/events/IDomainEvent';
import OutboxMessageMapper from '../../../../domain/outbox/mappers/outboxMessageMapper';

export default abstract class OutboxBaseConsumer implements IOutboxConsumer<IDomainEvent> {
  protected abstract queueUrl: string;

  protected abstract visibilityTimeout: number;

  protected abstract workerName: string;

  protected abstract batchSize: number | undefined;

  protected getMessageEvent(message: Message): IDomainEvent {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rawJson = JSON.parse(message.Body!);

    const outboxMessage = OutboxMessageMapper.toDomain(rawJson);
    const event = this.getEvent(outboxMessage.message);

    return event;
  }

  setup(): void {
    const consumer = Consumer.create({
      sqs: sqsClient,
      queueUrl: this.queueUrl,
      visibilityTimeout: this.visibilityTimeout,
      batchSize: this.batchSize,
      handleMessage: async (message: Message) => {
        try {
          console.info(`[Start] Message ${message.MessageId} processing in ${this.workerName}`);
          await this.onMessage(this.getMessageEvent(message));
          console.info(`[End] Message ${message.MessageId} successfully processed`);
        } catch (err) {
          console.error(err, `[${this.workerName}: Error processing message.`);

          throw err;
        }
      },
      handleMessageBatch: async (messages: Message[]) => {
        console.info(`[Start] Batch of ${messages.length} messages received in ${this.workerName}`);

        messages.forEach(async (message) => {
          console.info(`Message ${message.MessageId} processing`);
          await this.onMessage(this.getMessageEvent(message));
          console.info(`Message ${message.MessageId} successfully processed`);
        });

        console.info('[End] Batch of messages finished.');
      }
    });

    consumer.on('error', (err) => {
      console.error(`Error: ${err.message}`);
    });

    consumer.on('processing_error', (err) => {
      console.error(`Processing Error: ${err.message}`);
    });

    consumer.on('timeout_error', (err) => {
      console.error(`Timeout Error: ${err.message}`);
    });

    consumer.start();
    console.info(`🚀 ${this.workerName} worker listening`);
  }

  abstract onMessage(event: IDomainEvent): Promise<void> | void;

  abstract getEvent(message: any): IDomainEvent;
}
