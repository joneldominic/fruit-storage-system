import Models from '../../../../infrastructure/database/mongoose/models';
import MongooseOutboxRepository from './mongoose/outboxRepository';

const outboxRepository = new MongooseOutboxRepository(Models);

export default outboxRepository;
