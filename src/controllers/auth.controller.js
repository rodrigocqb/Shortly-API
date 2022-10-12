import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import connection from "../database/database.js";

async function createUser(req, res) {
  const { confirmPassword } = req.body;
  let { name, email, password } = req.body;
  name = stripHtml(name).result.trim();
  email = stripHtml(email).result.trim();
  if (password !== confirmPassword) {
    return res.status(422).send({ error: "Passwords do not match" });
  }
  password = bcrypt.hashSync(password, 10);
  try {
    const user = (
      await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
    ).rows[0];
    if (user) {
      return res
        .status(409)
        .send({ error: "An user with this email is already registered" });
    }
    connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, password]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { createUser };
