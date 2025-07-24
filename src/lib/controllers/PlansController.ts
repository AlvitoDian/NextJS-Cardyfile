import { successResponse, errorResponse } from "@/utils/apiResponse";
import { getPlanById } from "../models/Plans";

export async function fetchPlanById(plan_id: string) {
  try {
    const plan = await getPlanById(plan_id);

    if (!plan) {
      return errorResponse("Plan not found!", 404);
    }

    return successResponse("Plans fetched successfully", plan, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
