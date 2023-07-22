export default interface IOutboxJob {
  execute(): Promise<void>;
}
