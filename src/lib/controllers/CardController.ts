import {
  getAllCards,
  getCardByLink,
  createCard,
  updateCardById,
} from "../models/Card";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function fetchAllCards() {
  try {
    const cards = await getAllCards();
    return successResponse("Cards fetched successfully", cards, 201);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function fetchCardByLink(card_link: string) {
  try {
    const card = await getCardByLink(card_link);

    if (!card) {
      return errorResponse("Kartu tidak ditemukan!", 404);
    }

    return successResponse("Card fetched successfully", card, 201);
  } catch (error) {
    console.error("Error fetching card by link:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function postCard(req: Request) {
  try {
    const body = await req.json();
    const { card_link, title } = body;

    if (!card_link || !title) {
      return errorResponse("Semua field wajib diisi", 400);
    }

    const existingCard = await getCardByLink(card_link);
    if (existingCard) {
      return errorResponse("Kartu dengan link ini sudah ada", 400);
    }

    const newCard = await createCard({ card_link, title });

    return successResponse("Card created successfully", newCard, 201);
  } catch (error) {
    console.error("Error posting card:", error);
    return errorResponse("Terjadi kesalahan pada server", 500, error);
  }
}

export async function updateCard(card_link: string, req: Request) {
  try {
    const body = await req.json();
    const { title, description, link } = body;

    if (!title && !description && !link) {
      return errorResponse(
        "Setidaknya satu field wajib diisi untuk update",
        400
      );
    }

    if (!card_link) {
      return errorResponse("Card ID tidak ditemukan", 400);
    }

    const updatedCard = await updateCardById(card_link, {
      title,
      description,
      link,
    });

    if (!updatedCard) {
      return errorResponse("Kartu tidak ditemukan", 404);
    }

    return successResponse("Card updated successfully", updatedCard, 200);
  } catch (error) {
    console.error("Error updating card:", error);
    return errorResponse("Terjadi kesalahan pada server", 500, error);
  }
}
