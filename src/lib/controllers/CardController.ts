import { NextResponse } from "next/server";
import { getAllCards } from "../models/Card";

export async function fetchAllCards() {
  try {
    const cards = await getAllCards();
    return NextResponse.json(
      { message: "Cards fetch successfully", data: cards, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: 500, error: "Internal Server Error" };
  }
}
