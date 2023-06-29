import { Router } from "express";
import TransferService from "../services/transfer.service";

const transferRouter = Router();

import authMiddleware from "../middleware/auth.middleware";

transferRouter.post("", authMiddleware, TransferService.transferController);

export const router = transferRouter;
