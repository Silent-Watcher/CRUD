import { Controller } from '$interfaces/Controller';

import { userModel } from './user.model';

import type { Types } from 'mongoose';
class UserService extends Controller {
  constructor() {
    super();
  }

  async checkIfTheUserExistsWithId(id: string | Types.ObjectId) {
    const foundedUser = await userModel.findById(id, { _id: 1 }).lean();
    return foundedUser ? true : false;
  }
}

export default new UserService();
