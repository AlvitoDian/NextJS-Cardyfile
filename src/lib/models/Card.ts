import pool from "../db";

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
