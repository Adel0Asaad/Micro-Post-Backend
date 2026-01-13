import {Router} from 'express';
import {
  loginController,
  logoutController,
  registerController,
  sessionController,
} from './controllers';

const authRouter = Router();

/**
 * POST
 */

authRouter.post('/login', loginController);
authRouter.post('/logout', logoutController);
authRouter.post('/register', registerController);

/**
 * GET
 */

authRouter.get('/session', sessionController);

export default authRouter;
