import bcrypt from "bcrypt";
import pool from "../db";

export async function getAllUsers() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM m_user");
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function findUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM m_user WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

export async function createUser(email: string, password: string) {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      "INSERT INTO m_user (email, usrpw) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
}
