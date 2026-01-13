import {Router} from 'express';
import {getUserPostsController, getUsersController} from './controllers';

const usersRouter = Router();

/**
 * GET
 */

usersRouter.get('/', getUsersController);
usersRouter.get('/:userId/posts', getUserPostsController);
export default usersRouter;
