import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import templateController from "./modules/template/handler";
import backgroundHandler from "./modules/background/handler";
import layoutHandler from "./modules/layout/handler";
import assetCategoryHandler from "./modules/assetCategory/handler";
import assetHandler from './modules/asset/handler';
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use('/templates', templateController)
    .use('/backgrounds', backgroundHandler)
    .use('/layouts', layoutHandler)
    .use('/asset-categories', assetCategoryHandler)
    .use('/assets', assetHandler)
    .use(errorHandler)
    .get('/', (req, res) => {
      res.send({ message: 'Hello API' });
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
