import express from "express";
import cors from "cors";
import type { ConnectOptions } from "mongoose";
import mongoose from "mongoose";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import router from "./routes";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.express.disable("x-powered-by");

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    const loggerMiddleware = morgan("dev");
    const bodyParserMiddleware = [urlencoded({ extended: true }), json()];
    const corsMiddleware = cors();

    this.express.use(corsMiddleware);
    this.express.use(bodyParserMiddleware);
    this.express.use(loggerMiddleware);
  }

  private database(): void {
    mongoose.connect(
      "mongodb+srv://guiduck02:654321kcudiug@cardfactory.qpluamv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      } as ConnectOptions
    );
  }

  private routes(): void {
    this.express.use("/api", router);
  }
}

export default new App().express;
