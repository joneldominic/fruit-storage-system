import OutboxRepository from '../../../domain/outbox/repos/implementations';
import { getDBConnection } from '../../database/mongoose';
import UnitOfWork from './mongoose/UnitOfWork';

const unitOfWork = new UnitOfWork(getDBConnection, OutboxRepository);

export default unitOfWork;
