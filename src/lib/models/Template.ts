import pool from "../db";

export async function getTemplateById(temp_id: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT template FROM m_template WHERE temp_id = $1",
      [temp_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function updateCountTemplate(temp_id: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE m_template SET used = used + 1 WHERE temp_id = $1 RETURNING used",
      [temp_id]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}
