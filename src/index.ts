import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// import {authenticateToken} from '@network/routes/auth/middleware';
import {authRouter, postsRouter, usersRouter} from './routes';
import {authenticateToken} from '@common/middleware';

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 4000;

/**
 * This line was used in a previous project of mine when I used nginx to serve this app
 * will only be useful in PROD if this goes to PROD.
 */
// app.set('trust proxy', true);

/**
 * Middleware
 */
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const delta = Date.now() - startTime;
    console.log(
      `[Server]: ${req.method} ${req.originalUrl} took ${delta}ms | code: [${res.statusCode}]`,
    );
  });

  next();
});

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({limit: '1000mb'}));

/**
 * Routes
 */
app.use('/api/auth', authRouter);
app.use('/api/', authenticateToken, postsRouter);
app.use('/api/users', authenticateToken, usersRouter);

/**
 * Bind to localhost ONLY
 */
app.listen(port, '127.0.0.1', () => {
  console.log(`[server]: API running at http://127.0.0.1:${port}`);
});
