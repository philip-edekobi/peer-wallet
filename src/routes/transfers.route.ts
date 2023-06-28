import { Router } from "express";
import TransferService from "../services/transfer.service";

const transferRouter = Router();

import authMiddleware from "../middleware/auth.middleware";

export default { router: transferRouter };

transferRouter.post("", authMiddleware, TransferService.transferController);
