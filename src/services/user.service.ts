import { Request, Response } from "express";
import { IUser } from "../dtos/user.dto";
import UserRepo from "../repositories/user.repo";

export default class UserService {
  static async createController(req: Request, res: Response) {
    const user = req.body as IUser;

    try {
      const newUser = await UserRepo.addUser(user);

      req.session.user = newUser;
      req.session.save();

      return res
        .status(200)
        .json({ success: true, data: { ...newUser, password: null } });
    } catch (error) {
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }

  static async loginController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserRepo.getUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }

      if (user.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: "incorrect password" });
      }

      req.session.user = user;
      req.session.save();

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }
}
