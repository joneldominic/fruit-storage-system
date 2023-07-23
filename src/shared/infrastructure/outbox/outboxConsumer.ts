export default interface IOutboxConsumer<T> {
  setup(): Promise<void> | void;
  onMessage(message: T): Promise<void> | void;
  getEvent(message: any): T;
}
