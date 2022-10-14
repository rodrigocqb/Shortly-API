import jwt from "jsonwebtoken";
import connection from "../database/database.js";

async function checkToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId;
  try {
    userId = jwt.verify(token, process.env.TOKEN_SECRET).userId;
  } catch (error) {
    connection.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
    return res.status(401).send({ error: "User not authorized" });
  }
  try {
    const user = (
      await connection.query(`SELECT * FROM users WHERE id = $1;`, [userId])
    ).rows[0];
    if (!user) {
      if (req.path === "/users/me") {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(401).send({ error: "User not authorized" });
    }
    delete user.password;
    res.locals.user = user;
    const isTokenValid = (
      await connection.query(
        `SELECT * FROM sessions WHERE "userId" = $1 
        AND token = $2 AND valid = TRUE;`,
        [userId, token]
      )
    ).rows[0];
    if (!isTokenValid) {
      return res.status(401).send({ error: "User not authorized" });
    }
    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default checkToken;
