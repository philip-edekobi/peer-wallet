import { Router } from "express";

import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1, // Limit each IP to 1 request per `window` (here, per 1 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const userRouter = Router();

// authentication and authorization
import authMiddleware from "../middleware/auth.middleware";
import UserService from "../services/user.service";

userRouter.post("", UserService.createController);

userRouter.post("/login", UserService.loginController);

userRouter.post("/deposit/initialize", authMiddleware, UserService.initDeposit);

userRouter.post(
  "/deposit/verify",
  apiLimiter,
  authMiddleware,
  UserService.depositController
);

export const router = userRouter;
