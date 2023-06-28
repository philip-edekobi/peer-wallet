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
      references: {
        model: "wallets",
        key: "id",
      },
    },
    toWalletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "wallets",
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
    indexes: [{ fields: ["fromWalletId", "toWalletId"] }],
  }
);
export default Transfer;
