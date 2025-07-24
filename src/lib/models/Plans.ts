import { sanitizeInput } from "@/utils/sanitizeInput";
import pool from "../db";
import { TransactionPlans } from "@/types/plans";

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

export async function createPlans(data: TransactionPlans, session) {
  const client = await pool.connect();
  try {
    const prepare_plnid = sanitizeInput(data.plnid, "number");

    const startDate = new Date();
    const endDate = new Date(startDate);

    const duration = parseInt(data.durat, 10) || 30;
    endDate.setDate(startDate.getDate() + duration);

    const prepare_strdt = startDate.toISOString();
    const prepare_enddt = endDate.toISOString();
    const prepare_stats = "A";

    const result = await client.query(
      `INSERT INTO t_plans (plnid, usrid, strdt, enddt, stats, crtdt)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       RETURNING *`,
      [
        prepare_plnid,
        session.user.usrid,
        prepare_strdt,
        prepare_enddt,
        prepare_stats,
      ]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}
