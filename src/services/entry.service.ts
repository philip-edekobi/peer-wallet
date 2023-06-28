import EntryRepo from "../repositories/entry.repo";
import { Request, Response } from "express";

export default class EntryService {
  static async listEntries(_: Request, res: Response) {
    try {
      const entries = await EntryRepo.getEntries();
      return res.status(200).json({ success: true, data: entries });
    } catch (error) {
      const { message } = error as Error;
      if (message === "User not found") {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }
}
