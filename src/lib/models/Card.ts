import { CardPayload } from "@/types/card";
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

export async function getCardById(card_link: string) {
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

export async function getCardDetailById(
  card_link: string
): Promise<CardPayload | null> {
  const client = await pool.connect();
  try {
    const sanitizedLink = sanitizeInput(card_link, "string");

    const contentResult = await client.query(
      `SELECT usrnm AS username, desc1 AS description, primg AS "profileImage",
              bnimg AS "bannerImage", bgclr AS "backgroundColor"
       FROM m_card_content
       WHERE card_link = $1`,
      [sanitizedLink]
    );

    if (contentResult.rows.length === 0) return null;
    const baseData = contentResult.rows[0];

    const socmedResult = await client.query(
      `SELECT desc1 AS platform, href1 AS href
       FROM m_card_socmed
       WHERE card_link = $1
       ORDER BY seq ASC`,
      [sanitizedLink]
    );

    const menuResult = await client.query(
      `SELECT desc1 AS label, href1 AS href
       FROM m_card_menu
       WHERE card_link = $1
       ORDER BY seq ASC`,
      [sanitizedLink]
    );

    const payload: CardPayload = {
      ...baseData,
      socialMedia: socmedResult.rows || [],
      menu: menuResult.rows || [],
    };

    return payload;
  } catch (error) {
    console.error("Error fetching full card data:", error);
    return null;
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
    const { card_link, title } = data;

    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_title = sanitizeInput(title, "string");

    const result = await client.query(
      `UPDATE m_card 
       SET title = $1, chgdt = CURRENT_TIMESTAMP
       WHERE card_link = $2
       RETURNING *`,
      [prepare_title, prepare_card_link, cardId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function upsertCardContentById(card_link, data: CardPayload) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_usrnm = sanitizeInput(data.username, "string");
    const prepare_desc1 = sanitizeInput(data.description, "string");
    const prepare_primg = sanitizeInput(data.profileImage, "string");
    const prepare_bnimg = sanitizeInput(data.bannerImage, "string");
    const prepare_bgclr = sanitizeInput(data.backgroundColor, "string");

    const result = await client.query(
      `INSERT INTO m_card_content 
        (card_link, usrnm, desc1, primg, bnimg, bgclr, crtdt, chgdt)
       VALUES 
        ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT (card_link) DO UPDATE
       SET 
         usrnm = EXCLUDED.usrnm,
         desc1 = EXCLUDED.desc1,
         primg = EXCLUDED.primg,
         bnimg = EXCLUDED.bnimg,
         bgclr = EXCLUDED.bgclr,
         chgdt = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        prepare_card_link,
        prepare_usrnm,
        prepare_desc1,
        prepare_primg,
        prepare_bnimg,
        prepare_bgclr,
      ]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function insertCardMenu(card_link, data) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_seq = sanitizeInput(data.seq, "number");
    const prepare_label = sanitizeInput(data.label, "string");
    const prepare_href = sanitizeInput(data.href, "string");

    const result = await client.query(
      `INSERT INTO m_card_menu (card_link, seq, desc1, href1)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [prepare_card_link, prepare_seq, prepare_label, prepare_href]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function insertCardSocmed(card_link, data) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_seq = sanitizeInput(data.seq, "number");
    const prepare_desc1 = sanitizeInput(data.platform, "string");
    const prepare_href = sanitizeInput(data.href, "string");

    const result = await client.query(
      `INSERT INTO m_card_socmed (card_link, seq, desc1, href1)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [prepare_card_link, prepare_seq, prepare_desc1, prepare_href]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function deleteMenusByCardLink(card_link: string) {
  const client = await pool.connect();
  try {
    await client.query(`DELETE FROM m_card_menu WHERE card_link = $1`, [
      card_link,
    ]);
  } finally {
    client.release();
  }
}

export async function deleteSocmedByCardLink(card_link: string) {
  const client = await pool.connect();
  try {
    await client.query(`DELETE FROM m_card_socmed WHERE card_link = $1`, [
      card_link,
    ]);
  } finally {
    client.release();
  }
}
