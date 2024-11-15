import path from 'node:path';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import contactRouters from '../src/routers/contacts.js';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger.json' with {type: "json"};

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use('/api-docs', swaggerUi.serve);
  app.use('/api-docs', swaggerUi.setup(swaggerDocs));
  app.use('/photos', express.static(path.resolve('src', 'public/photos')));
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/auth', authRouter);
  app.use('/contacts', contactRouters);
  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
