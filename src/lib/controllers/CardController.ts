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
  deleteCardById,
} from "../models/Card";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { resizeImage } from "@/utils/resizeImage";
import { getTemplateById, updateCountTemplate } from "../models/Template";

export async function fetchAllCards(session) {
  try {
    const cards = await getAllCards(session);
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

export async function postCard(req: Request, session) {
  try {
    const body = await req.json();
    const { card_link, title, temp_id } = body;

    if (!card_link || !title || !temp_id) {
      return errorResponse("Semua field wajib diisi", 400);
    }

    const existingCard = await getCardById(card_link);
    if (existingCard) {
      return errorResponse(
        `A card with the link <strong>${card_link}</strong> already exists.`,
        400
      );
    }

    const newCard = await createCard({ card_link, title }, session);
    await defaultingCard(card_link, temp_id);

    return successResponse("Card created successfully", newCard, 201);
  } catch (error) {
    console.error("Error posting card:", error);
    return errorResponse("Terjadi kesalahan pada server", 500, error);
  }
}

export async function defaultingCard(card_link: string, temp_id: string) {
  try {
    const getTemplate = await getTemplateById(temp_id);
    if (!getTemplate) {
      return errorResponse("Template not found", 404);
    }

    await updateCountTemplate(temp_id);

    const payload = getTemplate.template;

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
          bgclr: item.backgroundColor,
          txclr: item.textColor,
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
    console.error("Error:", error);
    return errorResponse(error.message, 500, error);
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
          bgclr: item.backgroundColor,
          txclr: item.textColor,
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
    console.error("Error:", error);
    return errorResponse(error.message, 500, error);
  }
}

export async function removeCardById(card_link: string) {
  try {
    const card = await deleteCardById(card_link);

    if (!card) {
      return errorResponse("Kartu tidak ditemukan!", 404);
    }

    return successResponse("Card deleted successfully", card, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}
