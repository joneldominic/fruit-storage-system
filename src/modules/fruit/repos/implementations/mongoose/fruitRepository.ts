import { MongooseModels } from '../../../../../shared/infrastructure/database/mongoose/models';
import Fruit from '../../../domain/fruit';
import FruitMapper from '../../../mappers/fruitMapper';
import IFruitRepository from '../../fruitRepository';

export default class FruitRepository implements IFruitRepository {
  private models: MongooseModels;

  constructor(models: MongooseModels) {
    this.models = models;
  }

  async exists(name: string): Promise<boolean> {
    const FruitModel = this.models.Fruit;
    const fruit = await FruitModel.findOne({ name }).lean();

    return !!fruit;
  }

  async save(fruit: Fruit): Promise<void> {
    const FruitModel = this.models.Fruit;

    const exists = await this.exists(fruit.name.value);
    if (exists) throw new Error('Fruit already exists.');

    const rawMongooseFruit = FruitMapper.toPersistence(fruit);
    await FruitModel.create(rawMongooseFruit);
  }
}
