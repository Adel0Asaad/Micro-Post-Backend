import {Router} from 'express';
import {
  createPostController,
  deletePostController,
  getPostController,
  getPostsController,
} from './controllers';

const postsRouter = Router();

/**
 * POST
 */

postsRouter.post('/', createPostController);

/**
 * GET
 */

postsRouter.get('/', getPostsController);
postsRouter.get('/:postId', getPostController);

/**
 * DELETE
 */

postsRouter.delete('/:postId', deletePostController);

export default postsRouter;
