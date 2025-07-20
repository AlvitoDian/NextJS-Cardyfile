import { CardPayload } from "@/types/card";
import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";

export async function getAllCards(session) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT 
        a.card_link, 
        a.title, 
        COUNT(b.card_link) AS total_views, 
        TO_CHAR(a.crtdt, 'YYYY-MM-DD HH24:MI:SS') AS crtdt, 
        TO_CHAR(a.chgdt, 'YYYY-MM-DD HH24:MI:SS') AS chgdt 
      FROM 
        m_card a 
        LEFT JOIN t_view b ON b.card_link = a.card_link 
      WHERE 
        a.crtby = $1
      GROUP BY 
        a.card_link, 
        a.title, 
        a.crtdt, 
        a.chgdt 
      ORDER BY 
        a.chgdt DESC
      `,
      [session.user.usrid]
    );
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
              bnimg AS "bannerImage", bgclr AS "backgroundColor", txclr1 AS "usernameTextColor", txclr2 AS "descriptionTextColor"
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
      `SELECT desc1 AS label, href1 AS href, bgclr AS "backgroundColor", txclr AS "textColor"
       FROM m_card_menu
       WHERE card_link = $1
       ORDER BY seq ASC`,
      [sanitizedLink]
    );

    const payload: CardPayload = {
      ...baseData,
      socialMedia: socmedResult?.rows?.length > 0 ? socmedResult.rows : [],
      menu: menuResult?.rows?.length > 0 ? menuResult.rows : [],
    };

    return payload;
  } catch (error) {
    console.error("Error fetching full card data:", error);
    return null;
  } finally {
    client.release();
  }
}

export async function createCard(data, session) {
  const client = await pool.connect();
  try {
    const { card_link, title } = data;

    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_title = sanitizeInput(title, "string");

    const result = await client.query(
      `INSERT INTO m_card (card_link, title, crtby, crtdt, chgdt)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [prepare_card_link, prepare_title, session.user.usrid]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCardById(card_link, data) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_title = sanitizeInput(data.username, "string");

    const result = await client.query(
      `UPDATE m_card 
       SET title = $1, chgdt = CURRENT_TIMESTAMP
       WHERE card_link = $2
       RETURNING *`,
      [prepare_title, prepare_card_link]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function upsertCardContentById(
  card_link,
  data: CardPayload,
  session
) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");
    const prepare_usrnm = sanitizeInput(data.username, "string");
    const prepare_desc1 = sanitizeInput(data.description, "string");
    const prepare_primg = sanitizeInput(data.profileImage, "string");
    const prepare_bnimg = sanitizeInput(data.bannerImage, "string");
    const prepare_bgclr = sanitizeInput(data.backgroundColor, "string");
    const prepare_txclr1 = sanitizeInput(data.usernameTextColor, "string");
    const prepare_txclr2 = sanitizeInput(data.descriptionTextColor, "string");

    await client.query("BEGIN");

    const result = await client.query(
      `INSERT INTO m_card_content 
        (card_link, usrnm, desc1, primg, bnimg, bgclr, crtdt, chgdt, txclr1, txclr2)
       VALUES 
        ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $7, $8)
       ON CONFLICT (card_link) DO UPDATE
       SET 
         usrnm = EXCLUDED.usrnm,
         desc1 = EXCLUDED.desc1,
         primg = EXCLUDED.primg,
         bnimg = EXCLUDED.bnimg,
         bgclr = EXCLUDED.bgclr,
         chgdt = CURRENT_TIMESTAMP,
         txclr1 = EXCLUDED.txclr1,
         txclr2 = EXCLUDED.txclr2
       RETURNING *`,
      [
        prepare_card_link,
        prepare_usrnm,
        prepare_desc1,
        prepare_primg,
        prepare_bnimg,
        prepare_bgclr,
        prepare_txclr1,
        prepare_txclr2,
      ]
    );

    await client.query(
      `UPDATE m_card
       SET title = $1,
           chgdt = CURRENT_TIMESTAMP
       WHERE card_link = $2`,
      [prepare_usrnm, prepare_card_link]
    );

    await client.query("COMMIT");

    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
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
    const prepare_bgclr = sanitizeInput(data.bgclr, "string");
    const prepare_txclr = sanitizeInput(data.txclr, "string");

    const result = await client.query(
      `INSERT INTO m_card_menu (card_link, seq, desc1, href1, bgclr, txclr)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        prepare_card_link,
        prepare_seq,
        prepare_label,
        prepare_href,
        prepare_bgclr,
        prepare_txclr,
      ]
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

export async function deleteCardById(card_link: string) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(card_link, "string");

    await client.query("BEGIN");

    await client.query(`DELETE FROM m_card_menu WHERE card_link = $1`, [
      prepare_card_link,
    ]);

    await client.query(`DELETE FROM m_card_socmed WHERE card_link = $1`, [
      prepare_card_link,
    ]);

    await client.query(`DELETE FROM m_card_content WHERE card_link = $1`, [
      prepare_card_link,
    ]);

    await client.query(`DELETE FROM m_card WHERE card_link = $1`, [
      prepare_card_link,
    ]);

    await client.query("COMMIT");
    return { success: true };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting card data:", error);
    return { success: false, error };
  } finally {
    client.release();
  }
}
