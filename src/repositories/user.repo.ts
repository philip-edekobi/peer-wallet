import { IUser } from "../dtos/user.dto";
import { IWallet } from "../dtos/wallet.dto";
import User from "../db/models/user";
import Wallet from "../db/models/wallet";

export default class UserRepo {
  static async addUser(user: IUser) {
    try {
      const newUser = await User.create({ ...user });
      return newUser.toJSON() as IUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      return user?.toJSON() as IUser;
    } catch (error) {
      throw error;
    }
  }

  static async updateUserBalance(email: string, balance: number) {
    try {
      const user = await User.findOne({ where: { email } });
      const userInfo = (await user?.toJSON()) as IUser;

      if (user) {
        const [wallet] = await Wallet.findOrCreate({
          where: { ownerEmail: userInfo.email },
        });
        const walletInfo = (await wallet?.toJSON()) as IWallet;
        await wallet?.update({ balance: walletInfo.balance + balance });
        return wallet.toJSON() as IWallet;
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
