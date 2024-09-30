import { Controller } from '$app/common/interfaces/Controller';
import httpStatus from 'http-status';

import { userMessages } from '../user/user.messages';
import userService from '../user/user.service';
import { taskMessages } from './task.messages';
import taskService from './task.service';

import type { Request, Response, NextFunction } from 'express';
class TaskController extends Controller {
  private service;
  private userService;
  constructor() {
    super();
    this.service = taskService;
    this.userService = userService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await this.service.getAll(req?.user?.['_id']);
	  console.log('tasks: ', tasks);
      res.status(httpStatus.OK).send({
        status: res.statusCode,
        code: 'OK',
        message: `list of tasks`,
        tasks,
      });
      return;
    } catch (error) {
		console.log(error);
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // check if this task exists!
      const isTaskExists = await this.service.checkIfTheTaskExists(
        id,
        req?.user?.['_id'],
      );
      if (!isTaskExists) {
        res.status(httpStatus.NOT_FOUND).send({
          status: res.statusCode,
          error: {
            code: 'NOT FOUND',
            message: taskMessages.notFound,
          },
        });
        return;
      }

      const result = await this.service.delete(id);

      if (result.deletedCount) {
        res.status(httpStatus.OK).send({
          status: res.statusCode,
          code: 'OK',
          message: 'Success!',
        });
        return;
      }
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const taskDto = req.body;
      //  Check if the user exists
      const isUserExists = await this.userService.checkIfTheUserExistsWithId(
        taskDto.user,
      );
      if (!isUserExists) {
        res.status(httpStatus.BAD_REQUEST).send({
          status: res.statusCode,
          error: {
            code: 'BAD REQUEST',
            message: userMessages.notFoundWithId,
          },
        });
        return;
      }
      const result = await this.service.create(taskDto);

	  if(result){
		res.status(httpStatus.CREATED).send({
			status: res.statusCode,
			code : 'CREATED',
			message: taskMessages.created
		})
	  }
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
