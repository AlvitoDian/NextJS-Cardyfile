import pool from "../db";

export async function getPlanById(plan_id: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM m_plans WHERE plnid = $1",
      [plan_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
