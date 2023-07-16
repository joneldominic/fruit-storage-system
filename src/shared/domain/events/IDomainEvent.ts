import UniqueEntityID from '../UniqueEntityID';

export default interface IDomainEvent {
  readonly id: string;
  readonly dateTimeOccurred: Date;
  get eventId(): string;
  get aggregateId(): UniqueEntityID;
  toJSONString(): string;
  // static fromJSONString(jsonString: string): IDomainEvent;
}
