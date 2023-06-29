import axios from "axios";

const baseUrl = process.env.PAYSTACK_BASE_URL ?? "https://api.paystack.co";
const token = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function initializeTransaction(email: string, amount: number) {
  try {
    const initialResponse = await axios.post(
      `${baseUrl}/transaction/initialize`,
      { email, amount },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await initialResponse.data;

    return data;
  } catch (err) {
    throw err;
  }
}

export async function verifyTransaction(transactionRef: string) {
  try {
    const initialResponse = await axios.get(
      `${baseUrl}/transaction/verify/${transactionRef}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await initialResponse.data;

    return data;
  } catch (err) {
    throw err;
  }
}
