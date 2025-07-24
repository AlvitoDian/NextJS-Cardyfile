import { successResponse, errorResponse } from "@/utils/apiResponse";
import { createPlans, getPlanById } from "../models/Plans";

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

export async function postCreatePlans(req: Request, session) {
  try {
    const body = await req.json();

    const plan = await getPlanById(body.plnid);

    const newPlans = await createPlans(
      { plnid: body.plnid, durat: plan.durat },
      session
    );

    return successResponse("Plans created successfully", newPlans, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Terjadi kesalahan pada server", 500, error);
  }
}
