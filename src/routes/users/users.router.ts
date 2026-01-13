import {Router} from 'express';
import {getUsersController} from './controllers';

const usersRouter = Router();

/**
 * GET
 */

usersRouter.get('/users', getUsersController);
export default usersRouter;
