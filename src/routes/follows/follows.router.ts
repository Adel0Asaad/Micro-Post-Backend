import {Router} from 'express';
import {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
  checkFollowController,
  getFollowCountsController,
  getFollowingPostsController,
} from './controllers';

const followsRouter = Router();

/**
 * POST /follows - Follow a user
 * Body: { userId: string }
 */
followsRouter.post('/', followUserController);

/**
 * DELETE /follows/:userId - Unfollow a user
 */
followsRouter.delete('/:userId', unfollowUserController);

/**
 * GET /follows/check/:userId - Check if current user follows a user
 */
followsRouter.get('/check/:userId', checkFollowController);

/**
 * GET /follows/followers/:userId - Get followers of a user
 * GET /follows/followers - Get followers of current user
 */
followsRouter.get('/followers/:userId?', getFollowersController);

/**
 * GET /follows/following/posts - Get posts from users the current user follows (feed)
 * Note: This must be defined before /following/:userId? to avoid route conflicts
 */
followsRouter.get('/following/posts', getFollowingPostsController);

/**
 * GET /follows/following/:userId - Get users a user is following
 * GET /follows/following - Get users current user is following
 */
followsRouter.get('/following/:userId?', getFollowingController);

/**
 * GET /follows/counts/:userId - Get follow counts for a user
 * GET /follows/counts - Get follow counts for current user
 */
followsRouter.get('/counts/:userId?', getFollowCountsController);

export default followsRouter;
