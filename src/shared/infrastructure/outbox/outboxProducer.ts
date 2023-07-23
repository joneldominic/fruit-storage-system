export default interface IOutboxProducer<T> {
  produce(event: T): Promise<void>;
}
