import { CardPayload } from "@/types/card";
import {
  getAllCards,
  createCard,
  upsertCardContentById,
  deleteMenusByCardLink,
  insertCardMenu,
  deleteSocmedByCardLink,
  insertCardSocmed,
  getCardDetailById,
  getCardById,
} from "../models/Card";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { resizeImage } from "@/utils/resizeImage";

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
    const card = await getCardDetailById(card_link);

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

    const existingCard = await getCardById(card_link);
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
export async function updateCard(req: Request, card_link: string) {
  try {
    const payload = (await req.json()) as CardPayload;

    // RESIZE images
    if (payload.bannerImage) {
      payload.bannerImage = await resizeImage(payload.bannerImage);
    }

    if (payload.profileImage) {
      payload.profileImage = await resizeImage(payload.profileImage);
    }

    // UPDATE - Card Content
    const updatedCard = await upsertCardContentById(card_link, payload);

    if (!updatedCard) {
      return errorResponse("Kartu tidak ditemukan", 404);
    }

    // DELETE INSERT - Card Menu
    await deleteMenusByCardLink(card_link);
    await Promise.all(
      payload.menu.map((item, index) =>
        insertCardMenu(card_link, {
          label: item.label,
          href: item.href,
          seq: index + 1,
        })
      )
    );

    // DELETE INSERT - Social Media
    await deleteSocmedByCardLink(card_link);
    await Promise.all(
      payload.socialMedia.map((item, index) =>
        insertCardSocmed(card_link, {
          platform: item.platform,
          href: item.href,
          seq: index + 1,
        })
      )
    );

    return successResponse("Card updated successfully", updatedCard, 200);
  } catch (error) {
    console.error("Error updating cardsss:", error);
    return errorResponse(error.message, 500, error);
  }
}
