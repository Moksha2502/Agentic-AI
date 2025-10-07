import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface IChat extends Document {
  userId: string;
  chatType: 'diet' | 'skincare' | 'wellbeing';
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatType: { type: String, enum: ['diet', 'skincare', 'wellbeing'], required: true },
  title: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Index for better query performance
ChatSchema.index({ userId: 1, updatedAt: -1 });
ChatSchema.index({ userId: 1, chatType: 1 });
export const Chat = mongoose.model<IChat>('Chat', ChatSchema);