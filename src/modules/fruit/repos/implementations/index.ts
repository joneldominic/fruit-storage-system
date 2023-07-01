import Models from '../../../../shared/infrastructure/database/mongoose/models';
import MongooseFruitRepository from './mongoose/fruitRepository';

const fruitRepository = new MongooseFruitRepository(Models);

export default fruitRepository;
