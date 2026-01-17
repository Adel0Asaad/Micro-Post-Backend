import {Router} from 'express';
import {
  likePostController,
  unlikePostController,
  getPostLikesController,
  getUserLikedPostsController,
  checkLikeController,
} from './controllers';

const likesRouter = Router();

/**
 * POST /likes - Like a post
 * Body: { postId: string }
 */
likesRouter.post('/', likePostController);

/**
 * DELETE /likes/:postId - Unlike a post
 */
likesRouter.delete('/:postId', unlikePostController);

/**
 * GET /likes/check/:postId - Check if current user liked a post
 */
likesRouter.get('/check/:postId', checkLikeController);

/**
 * GET /likes/post/:postId - Get users who liked a post
 */
likesRouter.get('/post/:postId', getPostLikesController);

/**
 * GET /likes/user/:userId - Get posts liked by a user
 * GET /likes/user - Get posts liked by current user
 */
likesRouter.get('/user/:userId?', getUserLikedPostsController);

export default likesRouter;
