import { NextResponse } from "next/server";
import { createUser, getAllUsers } from "../models/User";

export async function fetchAllUsers() {
  try {
    const users = await getAllUsers();
    return NextResponse.json(
      { message: "User fetch successfully", data: users, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: 500, error: "Internal Server Error" };
  }
}

export async function registerUser(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    /*  const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    } */

    const newUser = await createUser(email, password);

    return NextResponse.json(
      { message: "User registered successfully", data: newUser, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
