import { Controller } from '$app/common/interfaces/Controller';
import httpStatus from 'http-status';

import userService from '../user/user.service';
import { taskMessages } from './task.messages';
import { taskModel } from './task.model';

import type { Task } from '$app/common/validation/schema/task.schema';

import type { Types } from 'mongoose';
class TaskService extends Controller {
  constructor() {
    super();
  }

  async getAll(userId: string | Types.ObjectId) {
    return taskModel.find({ user: userId }).lean();
  }

  async delete(id: string | Types.ObjectId) {
    return taskModel.deleteOne({ _id: id }).lean();
  }

  async checkIfTheTaskExists(
    taskId: string | Types.ObjectId,
    userId: string | Types.ObjectId,
  ) {
    const foundedTask = taskModel.findOne({ _id: taskId, user: userId });
    return foundedTask == null ? false : foundedTask;
  }

  async create(taskDto: Pick<Task, 'title' | 'user'>) {
    //  check for duplicate task value
    const isTitleDuplicated = await this.checkIfTheTaskTitleIsDuplicated(
      taskDto.title,
    );
    if (isTitleDuplicated)
      throw {
        status: httpStatus.CONFLICT,
        code: 'CONFLICT',
        message: taskMessages.duplicateTitleValue,
      };

    return taskModel.create(taskDto);
  }

  async checkIfTheTaskTitleIsDuplicated(title: string) {
    const foundedTask = await taskModel.findOne({ title }, { _id: 1 }).lean();
    return foundedTask ? true : false;
  }
}

export default new TaskService();
