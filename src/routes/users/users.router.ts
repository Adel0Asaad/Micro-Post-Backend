import {Router} from 'express';
import {getUserPostsController, getUsersController} from './controllers';

const usersRouter = Router();

/**
 * GET
 */

usersRouter.get('/', getUsersController);
usersRouter.post('/:userId/getUserPostsController', getUserPostsController);
export default usersRouter;
