// import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// const baseUrl = process.env.PAYSTACK_BASE_URL ?? "https://api.paystack.co";
// const token = process.env.PAYSTACK_SECRET_KEY ?? "";

// const params = JSON.stringify({
//   email: "customer@email.com",
//   amount: "20000",
// });

// axios
//   .post(baseUrl + "/transaction/initialize", params, {
//     headers: {
//       Authorization: token,
//       "Content-Type": "application/json",
//     },
//   })
//   .then(res => {
//     console.log(res.data);
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

import { startServer } from "./startServer";
import { testDb } from "./db/connection";
import morgan from "morgan";

const dbWorks = testDb();

if (!dbWorks) {
  process.exit(1);
}

startServer();