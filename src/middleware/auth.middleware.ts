import { Request, Response, NextFunction } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ success: false, message: "unauthorized" });
  }

  next();
}
