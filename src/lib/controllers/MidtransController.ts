import { PaymentPayload } from "@/types/payment";
import { successResponse } from "@/utils/apiResponse";
import { snap } from "@/utils/midtransClient";

export async function createSnapTransaction(req) {
  const body = (await req.json()) as PaymentPayload;

  const parameter = {
    transaction_details: {
      order_id: `ORD-${Date.now()}`,
      gross_amount: Number(body.amount),
    },
    customer_details: {
      first_name: body.firstName || "Alvito",
      last_name: body.lastName || "",
      email: body.email,
      phone: body.phone || "",
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    const response = {
      token: transaction.token,
    };
    return successResponse("Card created successfully", response, 201);
  } catch (error) {
    console.error("Midtrans Error:", error);
    throw new Error(error.message);
  }
}
