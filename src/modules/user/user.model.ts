import { model, Schema } from 'mongoose';

const userMongo = new Schema(
  {
    displayName: { type: String, trim: true, required: false },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true, versionKey: false },
);

// userMongo.virtual('tasks', {
//   ref: 'task',
//   localField: '_id',
//   foreignField: 'user',
// });

export const userModel = model('user', userMongo);
