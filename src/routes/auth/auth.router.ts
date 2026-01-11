import {Router} from 'express';

// import {findDataPath, getBytesFromBase64} from './middleware';
import {generateToken} from './controllers';

const authRouter = Router();

/**
 * MIDDLEWARE for /:fileName
 */

/**
 * POST
 */

authRouter.get('/token', generateToken);
// authRouter.post('/revoke', revokeToken);

export default authRouter;
