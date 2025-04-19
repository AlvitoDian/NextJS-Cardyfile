import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";

export async function getAllCards() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM m_card");
    return result.rows;
  } finally {
    client.release();
  }
}
export async function getCardByLink(card_link: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM m_card WHERE card_link = $1",
      [card_link]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createCard(data) {
  const client = await pool.connect();
  try {
    const { card_link, title } = data;

    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_title = sanitizeInput(title, "string");

    const result = await client.query(
      `INSERT INTO m_card (card_link, title, crtdt)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       RETURNING *`,
      [prepare_card_link, prepare_title]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCardById(cardId, data) {
  const client = await pool.connect();
  try {
    const { title, description, link } = data;

    let query = "UPDATE m_card SET";
    const values = [];
    const setFields = [];

    if (title) {
      setFields.push("card_title = $1");
      values.push(title);
    }
    if (description) {
      setFields.push("card_description = $2");
      values.push(description);
    }
    if (link) {
      setFields.push("card_link = $3");
      values.push(link);
    }

    if (setFields.length === 0) {
      throw new Error("No fields to update");
    }

    query += ` ${setFields.join(", ")} WHERE card_id = $${
      values.length + 1
    } RETURNING *`;

    values.push(cardId);

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } finally {
    client.release();
  }
}
