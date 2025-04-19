import { createUser, getAllUsers, findUserByEmail } from "../models/User";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function fetchAllUsers() {
  try {
    const data = await getAllUsers();
    return successResponse("User fetched successfully", data, 201);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function registerUser(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Harap isi email atau password", 400);
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse("Email sudah dipakai", 400);
    }

    const newUser = await createUser(email, password);
    return successResponse("User registered successfully", newUser, 201);
  } catch (error) {
    console.error("Error registering user:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
