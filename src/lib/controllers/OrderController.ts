import { successResponse, errorResponse } from "@/utils/apiResponse";
import { createOrder, getAllOrderByUser } from "../models/Order";
import { generateOrderNumber } from "@/utils/generateOrderNumber";

export async function fetchOrderByUser(session) {
  try {
    const orders = await getAllOrderByUser(session);
    return successResponse("Order fetched successfully", orders, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function postOrder(req: Request, session) {
  try {
    const body = await req.json();
    const { plnid, pay_mthod, pay_stats, pay_time, notes, ordno } = body;

    if (!plnid) {
      return errorResponse("Field 'plnid' wajib diisi", 400);
    }

    const finalOrdno = ordno || generateOrderNumber();

    const newOrder = await createOrder(
      {
        plnid,
        ordno: finalOrdno,
        pay_mthod,
        pay_stats,
        pay_time,
        notes,
      },
      session
    );

    return successResponse("Order created successfully", newOrder, 201);
  } catch (error) {
    console.error("Error posting order:", error);
    return errorResponse("Terjadi kesalahan pada server", 500, error);
  }
}
