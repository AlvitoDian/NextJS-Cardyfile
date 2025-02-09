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

/* export async function insertCard(card_link: string, usrnm: string, desc1) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM m_card");
    return result.rows[0];
  } finally {
    client.release();
  }
} */
