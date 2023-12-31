import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.POSTGRES_URI ?? "");

export async function testDb(): Promise<boolean> {
  try {
    await sequelize.authenticate();
    console.log("db works");
    return true;
  } catch (error) {
    console.error("baba db no work o because: ", error);
    return false;
  }
}

export async function initModels() {
  try {
    await sequelize.sync();
    console.log("models are synced");
  } catch (error) {
    console.error("models no sync o because: ", error);
  }
}
