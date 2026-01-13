import {Router} from 'express';
import {
  createPostController,
  deletePostController,
  getPostController,
  getPostsController,
  getUserPostsController,
} from './controllers';

const postsRouter = Router();

/**
 * POST
 */

postsRouter.post('/posts', createPostController);
postsRouter.post(
  '/users/:userId/getUserPostsController',
  getUserPostsController,
);

/**
 * GET
 */

postsRouter.get('/posts', getPostsController);
postsRouter.get('/posts/:postId', getPostController);

/**
 * DELETE
 */

postsRouter.delete('/posts/:postId', deletePostController);

export default postsRouter;
