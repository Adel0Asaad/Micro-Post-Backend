import {Router} from 'express';
import {getUsersController} from './controllers';

const usersRouter = Router();

/**
 * GET
 */

usersRouter.get('/', getUsersController);
export default usersRouter;
