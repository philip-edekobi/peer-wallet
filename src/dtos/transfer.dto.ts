import { IEntry } from "./entry.dto";
import { IWallet } from "./wallet.dto";

export interface ITransfer {
  id: number;
  amount: number;
  fromWalletId: number;
  toWalletId: number;
  createdAt: Date;
}
export interface ITransferTransaction {
  transfer: ITransfer;
  fromEntry: IEntry;
  toEntry: IEntry;
  fromWallet: IWallet;
  toWallet: IWallet;
}
