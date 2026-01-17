import {Router} from 'express';
import {
  createPostController,
  deletePostController,
  updatePostController,
  getPostController,
  getPostsController,
  createReplyController,
  getRepliesController,
} from './controllers';

const postsRouter = Router();

/**
 * POST /posts - Create a new post
 */
postsRouter.post('/', createPostController);

/**
 * PUT /posts/:postId - Update a post
 */
postsRouter.put('/:postId', updatePostController);

/**
 * POST /posts/:postId/replies - Create a reply to a post
 */
postsRouter.post('/:postId/replies', createReplyController);

/**
 * GET /posts - Get all posts
 */
postsRouter.get('/', getPostsController);

/**
 * GET /posts/:postId - Get a single post
 */
postsRouter.get('/:postId', getPostController);

/**
 * GET /posts/:postId/replies - Get replies to a post
 */
postsRouter.get('/:postId/replies', getRepliesController);

/**
 * DELETE /posts/:postId - Delete a post
 */
postsRouter.delete('/:postId', deletePostController);

export default postsRouter;
