import TransferRepo from "../repositories/transfer.repo";
import { Request, Response } from "express";

export default class TransferService {
  static async transferController(req: Request, res: Response) {
    const { from, to, amount } = req.body;
    const { user } = req.session;

    if (!(from && to && amount)) {
      return res
        .status(400)
        .json({ success: false, message: "from, to, and amount are required" });
    }

    try {
      const transfer = await TransferRepo.createTransfer(
        //@ts-ignore
        user.email,
        from,
        to,
        amount
      );
      return res.status(200).json({ success: true, data: transfer });
    } catch (error) {
      const { message } = error as Error;
      if (message) {
        return res.status(404).json({ success: false, message });
      }
      const errors = error as any;
      res.status(500).json({ success: false, message: errors });
    }
  }
}
