import { Types } from 'mongoose';
import Identifier from './Identifier';

export default class UniqueEntityID extends Identifier<string> {
  constructor(id?: string) {
    super(id || new Types.ObjectId().toHexString());
  }
}
