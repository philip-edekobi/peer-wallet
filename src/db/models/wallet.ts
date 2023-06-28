import { sequelize } from "../connection";
import { DataTypes } from "sequelize";

const Wallet = sequelize.define(
  "Wallet",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "ownerEmail_idx",
      references: {
        model: "User",
        key: "email",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "wallets",
  }
);

export default Wallet;
