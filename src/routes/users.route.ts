import { Router } from "express";

const userRouter = Router();

// authentication and authorization
import authMiddleware from "../middleware/auth.middleware";
import UserService from "../services/user.service";

userRouter.post("", UserService.createController);

userRouter.post("/login", UserService.loginController);

export default { router: userRouter };
