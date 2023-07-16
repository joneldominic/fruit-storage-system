import OutboxRepository from '../../../domain/outbox/repos/implementations';
import { getDBConnection } from '../../database/mongoose';
import UnitOfWork from './mongoose/UnitOfWork';

const mongoDBConnection = getDBConnection();
const unitOfWork = new UnitOfWork(mongoDBConnection, OutboxRepository);

export default unitOfWork;
