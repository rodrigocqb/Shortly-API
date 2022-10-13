import jwt from "jsonwebtoken";
import connection from "../database/database.js";

async function checkToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  let userId;
  try {
    userId = jwt.verify(token, process.env.JWT_SECRET).userId;
  } catch (error) {
    res.status(401).send({ error: "User not authorized" });
  }
  try {
    const user = (
      await connection.query(`SELECT * FROM users WHERE id = $1`, [userId])
    ).rows[0];
    delete user.password;
    if (!user) {
      return res.status(401).send({ error: "User not authorized" });
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export default checkToken;
