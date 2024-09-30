import { model, Schema, Types } from 'mongoose';

const taskMongo = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    isDone: { type: Boolean, required: true, default: false },
    user: { type: Types.ObjectId, required: true, ref: 'user' },
  },
  { timestamps: true, toJSON: { virtuals: true }, versionKey: false },
);

export const taskModel = model('task', taskMongo);
