import { Request, Response } from "express";
import { IUser } from "../dtos/user.dto";
import { hashPassword, comparePasswordWithHash } from "../utils";
import UserRepo from "../repositories/user.repo";
import { initializeTransaction, verifyTransaction } from "../utils/paystack";

export default class UserService {
  static async createController(req: Request, res: Response) {
    if (
      !(
        req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.password
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "firstName, lastName, email, and password are required",
      });
    }
    const user = req.body as IUser;
    user.password = await hashPassword(user.password);

    try {
      const newUser = await UserRepo.addUser(user);

      req.session.user = newUser;
      req.session.save();

      return res
        .status(200)
        .json({ success: true, data: { ...newUser, password: undefined } });
    } catch (error) {
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }

  static async loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(password && email)) {
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });
    }

    try {
      const user = await UserRepo.getUserByEmail(email);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }

      if (!(await comparePasswordWithHash(password, user.password))) {
        return res
          .status(401)
          .json({ success: false, message: "incorrect password" });
      }

      req.session.user = user;
      req.session.save();

      return res
        .status(200)
        .json({ success: true, data: { ...user, password: undefined } });
    } catch (error) {
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }

  static async initDeposit(req: Request, res: Response) {
    const { amount } = req.body;
    const { user } = req.session;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "amount is required" });
    }

    try {
      const paymentInfo = await initializeTransaction(
        user?.email ?? "",
        amount
      );

      return res.status(200).json({
        success: true,
        data: { ...paymentInfo },
      });
    } catch (error) {
      const { message } = error as Error;
      if (message) {
        return res.status(404).json({ success: false, message });
      }
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }

  static async depositController(req: Request, res: Response) {
    const { reference } = req.body;
    const { user } = req.session;

    if (!reference) {
      return res
        .status(400)
        .json({ success: false, message: "amount is required" });
    }

    try {
      const verification = await verifyTransaction(reference);

      if (!verification.status) {
        return res
          .status(400)
          .json({ success: false, message: "invalid reference" });
      }
      if (verification.data.status !== "success") {
        return res
          .status(400)
          .json({ success: false, message: "transaction faileds" });
      }

      console.log(verification);
      const gatewayResp = verification.data.gateway_response;
      if (gatewayResp === "Declined" || gatewayResp === "Abandoned") {
        return res
          .status(400)
          .json({ success: false, message: "your transaction was declined" });
      }

      const wallet = await UserRepo.updateUserBalance(
        user?.email ?? "",
        Number(verification.data.amount)
      );

      return res.status(200).json({
        success: true,
        data: { ...user, wallet },
      });
    } catch (error) {
      const { message } = error as Error;
      if (message) {
        return res.status(404).json({ success: false, message });
      }
      const { errors } = error as any;
      res.status(500).json({ success: false, message: errors[0].message });
    }
  }
}
