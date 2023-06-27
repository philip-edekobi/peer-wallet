import * as https from "http";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { setupRoutes } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = https.createServer(app);

setupRoutes(app);

export const startServer = () => {
  server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};
