import { IUser } from "../dtos/user.dto";
import User from "../db/models/user";

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
}
