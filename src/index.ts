import dotenv from "dotenv";

dotenv.config();

import { startServer } from "./startServer";
import { testDb as testDbConnection, initModels } from "./db/connection";

const dbWorks = testDbConnection();

if (!dbWorks) {
  process.exit(1);
} else {
  (async () => {
    await initModels();
  })();
  startServer();
}
