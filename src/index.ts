import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { db } from './database';
import { userRoute } from './modules/user';
import { restaurantRoute } from './modules/restaurant';
import config from './config/env.config';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

interface sentryResponse extends Response {
  sentry?: any;
}

const app: Application = express();

Sentry.init({
  dsn: 'https://38d42b2aec87403a9f953392e47eb41d@o1160816.ingest.sentry.io/6375321',
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
});

// To initiate and check incoming issues and errors.
app.use(Sentry.Handlers.requestHandler());
// To trace performance issues and server errors.
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello!! Welcome to MenuMatrix');
});

// mongo database connected
db();

//routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/restaurant', restaurantRoute);

//Sentry Function that actually handle errors
app.use(Sentry.Handlers.errorHandler());

//To throw errors
app.use(function onError(err: Error, req: Request, res: sentryResponse, next: NextFunction) {
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

// server up 🚀
app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
