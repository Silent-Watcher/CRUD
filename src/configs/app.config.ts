import { createServer } from 'http';
import compression from 'compression';
import type { Application } from 'express';
import express from 'express';
import { rateLimit } from 'express-rate-limit';

import logger from './logger.config';
import { configureResources } from './resources.config';

export function configureApplication(app: Application) {
  // basic middlewares
  app.use(
    express.json({ type: '*/*' }),
    express.urlencoded({ extended: true }),
  );
  // !! setup helmet
  // api call rate limitation
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      limit: 100, // Limit each IP to 100 requests per 15 minutes
    }),
  );
  // response compression
  app.use(compression({}));

  configureResources(app);
}

export function startServer(app: Application, port: number) {
  const server = createServer(app);

  server.listen(port, () => {
    logger.info(`server is up and running on port ${port}`);
  });
}
