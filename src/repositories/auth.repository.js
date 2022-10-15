import connection from "../database/database.js";

const TABLE = "users";

async function selectUserByEmail(email) {
  const user = (
    await connection.query(`SELECT * FROM ${TABLE} WHERE email = $1;`, [email])
  ).rows[0];
  return user;
}

async function selectUserById(id) {
  const user = (
    await connection.query(`SELECT * FROM ${TABLE} WHERE id = $1;`, [id])
  ).rows[0];
  return user;
}

async function selectToken(userId, token) {
  const isTokenValid = (
    await connection.query(
      `SELECT * FROM sessions WHERE "userId" = $1 
          AND token = $2 AND valid = TRUE;`,
      [userId, token]
    )
  ).rows[0];
  return isTokenValid;
}

async function insertUser(name, email, password) {
  await connection.query(
    `INSERT INTO ${TABLE} (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  );
  return;
}

async function insertSession(token, userId) {
  await connection.query(
    `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`,
    [token, userId]
  );
  return;
}

async function deleteSession(token) {
  await connection.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
  return;
}

export {
  selectUserByEmail,
  selectUserById,
  selectToken,
  insertUser,
  insertSession,
  deleteSession,
};
