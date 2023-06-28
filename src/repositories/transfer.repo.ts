import { ITransfer, ITransferTransaction } from "../dtos/transfer.dto";
import { sequelize } from "../db/connection";
import WalletRepo from "./wallet.repo";
import Transfer from "../db/models/transfer";
import Entry from "../db/models/entry";

export default class TransferRepo {
  static async createTransfer(
    currentUserEmail: string,
    from: number,
    to: number,
    amount: number
  ): Promise<ITransferTransaction> {
    const tx = await sequelize.transaction();

    try {
      const fromWallet = await WalletRepo.getWalletById(from);
      if (!fromWallet) {
        throw new Error("from wallet does not exist");
      }
      if (fromWallet.ownerEmail !== currentUserEmail) {
        throw new Error("wallet does not belong to user");
      }

      const toWallet = await WalletRepo.getWalletById(to);
      if (!toWallet) {
        throw new Error("to wallet does not exist");
      }

      const newTransfer = await Transfer.create(
        {
          amount,
          fromWalletId: from,
          toWalletId: to,
        },
        { transaction: tx }
      );
      const transfer = newTransfer.toJSON() as ITransfer;

      const fromEntryObj = await Entry.create(
        {
          amount: -amount,
          walletId: from,
        },
        { transaction: tx }
      );
      const fromEntry = fromEntryObj.toJSON();

      const toEntryObj = await Entry.create(
        {
          amount,
          walletId: to,
        },
        { transaction: tx }
      );
      const toEntry = toEntryObj.toJSON();

      const newFromWallet = await WalletRepo.updateWalletBalance(
        fromWallet.id,
        -amount
      );
      const newToWallet = await WalletRepo.updateWalletBalance(
        toWallet.id,
        amount
      );

      const transferTransaction = {
        transfer,
        fromEntry,
        toEntry,
        fromWallet: newFromWallet,
        toWallet: newToWallet,
      } as ITransferTransaction;

      await tx.commit();

      return transferTransaction;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }
}
