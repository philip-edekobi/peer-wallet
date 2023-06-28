import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const Transfer = sequelize.define(
  "Transfer",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromWalletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "fromWalletId_idx",
      references: {
        model: "Wallet",
        key: "id",
      },
    },
    toWalletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "toWalletId_idx",
      references: {
        model: "Wallet",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "transfers",
    indexes: [{ unique: true, fields: ["fromWalletId", "toWalletId"] }],
  }
);
export default Transfer;
