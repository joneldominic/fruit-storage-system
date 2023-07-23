import OutboxBaseConsumer from '../../../shared/infrastructure/outbox/implementation/aws-sqs/outboxBaseConsumer';
import FruitCreated from '../../fruit/domain/events/fruitCreated';

export default class FruitCreatedConsumer extends OutboxBaseConsumer {
  protected queueUrl: string = process.env.OUTBOX_FRUIT_CREATED_QUEUE_URL || 'QUEUE_URL_NOT_FOUND';

  protected visibilityTimeout: number = 30;

  protected workerName: string = 'Fruit Created Consumer';

  protected batchSize: undefined = undefined;

  onMessage(event: FruitCreated): void | Promise<void> {
    console.log('👨‍💻 Joneeeeel ~ file: fruitCreatedConsumer.ts:14 ~ event:', event.fruit);
    // TODO: Execute use case here
  }

  getEvent(message: any): FruitCreated {
    return FruitCreated.fromJSONString(message);
  }
}
