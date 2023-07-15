import mongoose, { Schema, Types } from 'mongoose';

interface IOutboxMessage {
  id: Types.ObjectId;
  eventId: string | null;
  status: number; // 0 = Pending, 1 = Done
  message: string | null;
  dateCreated: Date;
}

const OutboxMessageSchema = new Schema<IOutboxMessage>({
  id: { type: Schema.Types.ObjectId },
  eventId: { type: String },
  status: { type: Number },
  message: { type: String },
  dateCreated: { type: Date }
});

const OutboxMessage = mongoose.model('OutboxMessage', OutboxMessageSchema);
OutboxMessage.createIndexes();

export default OutboxMessage;
