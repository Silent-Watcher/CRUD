import { Controller } from '$app/common/interfaces/Controller';

import { taskModel } from './task.model';

import type { Types } from 'mongoose';

 class TaskService extends Controller {
  constructor() {
    super();
  }

  async getAll(userId: string | Types.ObjectId){
	return taskModel.find({user: userId} , {user:0}).lean()
  }
}


export default new TaskService()
