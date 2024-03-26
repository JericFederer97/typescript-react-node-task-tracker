import { Request, Response, Router } from 'express';

import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

// * Instantiate Router function
export const tasksRouter: Router = Router();

// * Routes
tasksRouter.get('/', (req: Request, res: Response) => {
    res.send('FINAL FANTASY XV - SOMNUS');
})

tasksRouter.get('/tasks', taskController.getAll)
tasksRouter.post('/tasks', createValidator, taskController.create);
tasksRouter.put('/tasks', updateValidator, taskController.update);
tasksRouter.delete('/tasks', taskController.delete);