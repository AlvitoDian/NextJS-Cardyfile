import { successResponse, errorResponse } from "@/utils/apiResponse";
import { ViewPayload } from "@/types/view";
import { insertView } from "../models/View";

export async function postView(req: Request, usrag, usrip) {
  try {
    const payload = (await req.json()) as ViewPayload;

    const result = await insertView(payload, usrag, usrip);

    if (!result) {
      return errorResponse("Kartu tidak ditemukan", 404);
    }

    return successResponse("Post View successfully", result, 200);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(error.message, 500, error);
  }
}
