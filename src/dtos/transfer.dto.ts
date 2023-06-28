export interface ITransfer {
  id: number;
  amount: number;
  fromWalletId: number;
  toWalletId: number;
  createdAt: Date;
}
