import * as https from "http";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import { IUser } from "./dtos/user.dto";
import { setupRoutes } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

declare module "express-session" {
  interface SessionData {
    user: IUser;
  }
}

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      conString: process.env.POSTGRES_URI ?? "",
    }),
    secret: process.env.SESSION_SECRET ?? "",
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 1000 * 60 * 60 * 24 * 7, // 2 weeks
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
  })
);

const server = https.createServer(app);

setupRoutes(app, process.env.BASE_API_ROUTE ?? "/api/v1");

export const startServer = () => {
  server.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};
