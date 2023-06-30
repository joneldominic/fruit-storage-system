import Fruit from '../domain/fruit';

export default interface IFruitRepository {
  exists(name: string): Promise<boolean>;
  save(fruit: Fruit): Promise<void>;
}
