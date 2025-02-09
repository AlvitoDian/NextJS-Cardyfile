import { NextResponse } from "next/server";
import { getAllCards, getCardByLink } from "../models/Card";

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

export async function fetchCardByLink(card_link: string) {
  try {
    const cards = await getCardByLink(card_link);

    if (!cards) {
      return NextResponse.json(
        { message: "Kartu Tidak ditemukan!", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Cards fetch successfully", data: cards, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return { status: 500, error: "Internal Server Error" };
  }
}
