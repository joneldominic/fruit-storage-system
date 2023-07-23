import OutboxBaseProducer from '../../../shared/infrastructure/outbox/implementation/aws-sqs/outboxBaseProducer';

export default class FruitCreatedProducer extends OutboxBaseProducer {
  protected queueUrl: string = process.env.OUTBOX_FRUIT_CREATED_QUEUE_URL || 'QUEUE_URL_NOT_FOUND';
}
