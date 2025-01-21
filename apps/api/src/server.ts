import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import templateController from "./modules/template/handler";
import backgroundHandler from "./modules/background/handler";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/templates", templateController)
    .use("/backgrounds", backgroundHandler)
    .use(errorHandler)
    .get("/", (req, res) => {
      res.send({ message: "Hello API" });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
