import { sanitizeInput } from "@/utils/sanitizeInput";
import pool from "../db";

export async function getAllOrderByUser(session) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT a.ordid, a.usrid, a,plnid, a.ordno, a.pay_mthod, a.pay_stats, a.pay_time, a.notes, b.name1 as plan_name 
      FROM t_order a
      LEFT JOIN m_plans b
      WHERE usrid = $1`,
      [session.user.usrid]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createOrder(data, session) {
  const client = await pool.connect();
  try {
    const prepare_plnid = sanitizeInput(data.plnid, "number");
    const prepare_ordno = sanitizeInput(data.ordno, "string");
    const prepare_pay_method = sanitizeInput(data.pay_mthod, "string");
    const prepare_pay_stats = sanitizeInput(data.pay_stats, "string");
    const prepare_pay_time = data.pay_time
      ? new Date(data.pay_time).toISOString()
      : null;
    const prepare_notes = sanitizeInput(data.notes || null, "string");

    const result = await client.query(
      `INSERT INTO t_order (
        usrid, plnid, ordno, pay_mthod, pay_stats, pay_time, crtdt, chgdt, notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $7)
      RETURNING *`,
      [
        session.user.usrid,
        prepare_plnid,
        prepare_ordno,
        prepare_pay_method,
        prepare_pay_stats,
        prepare_pay_time,
        prepare_notes,
      ]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}
