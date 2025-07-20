import { ViewPayload } from "@/types/view";
import pool from "../db";
import { sanitizeInput } from "@/utils/sanitizeInput";

export async function insertView(data: ViewPayload, usrag, usrip) {
  const client = await pool.connect();
  try {
    const prepare_card_link = sanitizeInput(data.card_link, "string");
    const prepare_usrag = sanitizeInput(usrag, "string");
    const prepare_usrip = sanitizeInput(usrip, "string");

    const result = await client.query(
      `INSERT INTO t_view (card_link, usrag, usrip, crtdt)
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
       RETURNING *`,
      [prepare_card_link, prepare_usrag, prepare_usrip]
    );

    return result.rows[0];
  } finally {
    client.release();
  }
}
