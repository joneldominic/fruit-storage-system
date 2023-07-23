import IDomainEvent from '../../../../shared/domain/events/IDomainEvent';
import UniqueEntityID from '../../../../shared/domain/UniqueEntityID';
import Fruit from '../fruit';

export const FRUIT_CREATED_EVENT_ID = 'FRUIT_CREATED';

export default class FruitCreated implements IDomainEvent {
  readonly id: string;

  readonly dateTimeOccurred: Date;

  readonly fruit: Fruit;

  constructor(fruit: Fruit) {
    this.id = FRUIT_CREATED_EVENT_ID;
    this.dateTimeOccurred = new Date();
    this.fruit = fruit;
  }

  get eventId(): string {
    return this.id;
  }

  get aggregateId(): UniqueEntityID {
    return this.fruit.id;
  }

  toJSONString(): string {
    const json = {
      id: this.id,
      dateTimeOccurred: this.dateTimeOccurred.toISOString(),
      fruit: this.fruit
    };

    return JSON.stringify(json);
  }

  static fromJSONString(json: string): FruitCreated {
    const { dateTimeOccurred, fruit } = JSON.parse(json);
    const parsedDateTimeOccurred = new Date(dateTimeOccurred);
    return new FruitCreated({ ...fruit, parsedDateTimeOccurred });
  }
}
