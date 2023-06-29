import Wallet from "../db/models/wallet";
import { IWallet } from "../dtos/wallet.dto";

export default class WalletRepo {
  static async getWalletById(id: number) {
    try {
      const wallet = await Wallet.findByPk(id);
      return wallet?.toJSON() as IWallet;
    } catch (err) {
      throw err;
    }
  }

  static async getWalletIDByOwnerEmail(email: string) {
    try {
      const [wallet] = await Wallet.findOrCreate({
        where: {
          ownerEmail: email,
        },
      });

      const walletInfo = wallet.toJSON() as IWallet;
      return walletInfo.id;
    } catch (error) {
      throw error;
    }
  }

  static async getWallets() {
    try {
      const wallets = await Wallet.findAll();
      const walletList = wallets.map(wallet => wallet.toJSON());
      return walletList;
    } catch (error) {
      throw error;
    }
  }

  static async updateWalletBalance(
    id: number,
    newBalance: number
  ): Promise<IWallet> {
    try {
      const wallet = await Wallet.findByPk(id);
      if (!wallet) {
        throw new Error("wallet does not exist");
      }
      const walletInfo = wallet.toJSON() as IWallet;
      const updatedWallet = await wallet.update({
        balance: walletInfo.balance + newBalance,
      });
      return updatedWallet.toJSON() as IWallet;
    } catch (error) {
      throw error;
    }
  }
}
