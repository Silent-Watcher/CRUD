import { Controller } from '$app/common/interfaces/Controller';
import httpStatus from 'http-status';

import taskService from './task.service';

import type {Request, Response, NextFunction } from 'express';
 class TaskController extends Controller {
	private service;
	constructor() {
		super();
		this.service = taskService
	}

	async getAll(req:Request,res:Response,next:NextFunction){
		try {
			const tasks = await this.service.getAll(req?.user?.['_id']);
			res.send(httpStatus.OK).send({
				status: res.statusCode,
				code: 'OK',
				message: `tasks for user : ${req?.user?.['email']}`,
				tasks
			})
			return;
		} catch (error) {
			next(error);
		}
	}
}


export default new
TaskController()
