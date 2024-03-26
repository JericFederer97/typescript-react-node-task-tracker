import { AppDataSource } from "../../index";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { UpdateResult } from "typeorm";

import { Task } from "./tasks.entity";
import { validationResult } from "express-validator";

class TasksController {
    public async getAll(
        req: Request,
        res: Response,
    ): Promise<Response> {
        // * Declare a variable to hold all tasks
        let allTasks: Task[];

        // * Fetch all tasks using the repository
        try {
            allTasks = await AppDataSource.getRepository(Task)
                .find({
                    order: {
                        date: 'ASC',
                    }
                });
            // ? Convert instance to an object
            allTasks = instanceToPlain(allTasks) as Task[];

            return res.json(allTasks).status(200);

        } catch(errors) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }
    }

    public async create(
        req: Request,
        res: Response
    ): Promise<Response> {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                });
        }

        // * Create a new instance of Task
        const newTask = new Task();

        // * Add the required properties to the Task object
        newTask.title = req.body.title;
        newTask.date = req.body.date;
        newTask.description = req.body.description;
        newTask.priority = req.body.priority;
        newTask.status = req.body.status;

        // * Add the new task to DB
        let createdTask: Task;

        try {
            createdTask = await AppDataSource.getRepository(Task).save(newTask);
            // ? Convert instance to an object
            createdTask = instanceToPlain(createdTask) as Task;

            return res
                .json(createdTask)
                .status(201);

        } catch (error) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }
    }

    public async update(
        req: Request,
        res: Response
    ): Promise<Response> {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                });
        }

        // * Check if task exists in DB
        let task: Task | null;
        
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: {
                    id: req.body.id,
                }
            })
        } catch (error) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }

        // * Return 400 if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist.'
            });
        }

        // * Declare variable for updatedTask
        let updatedTask: UpdateResult;

        // * Update task in DB
        try {
            updatedTask = await AppDataSource.getRepository(Task).update(
                req.body.id,
                plainToInstance(Task,{
                    status: req.body.status,
                }),
            );
            // ? Convert instance to an object
            updatedTask = instanceToPlain(updatedTask) as UpdateResult;

            return res.json(updatedTask).status(200);

        } catch (error) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }
    }

    public async delete(
        req: Request,
        res: Response
    ): Promise<Response> {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array(),
                });
        }

        // * Check if task exists in DB
        let task: Task | null;
        
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: {
                    id: req.body.id,
                }
            })
        } catch (error) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }

        // * Return 400 if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist.'
            });
        }

        // * Delete task in DB
        try {
            const deletedTask = instanceToPlain(task) as Task;

            await AppDataSource.getRepository(Task).delete(
                req.body.id
            );

            return res
                .json({
                    "msg": `Successfully deleted ${deletedTask.title} with an ID of ${deletedTask.id}`
                })
                .status(200);

        } catch (error) {
            return res
                .json({error: 'Internal Server Error'})
                .status(500);
        }
    }
}

export const taskController = new TasksController();
