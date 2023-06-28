import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const Entry = sequelize.define(
  "Entry",
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
    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "walletId_idx",
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
    tableName: "entries",
  }
);

export default Entry;
