import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database/database.js";
import {
  conflictResponse,
  createdResponse,
  okResponse,
  serverError,
  unauthorizedResponse,
  unprocessableResponse,
} from "./controllers.helper.js";

async function createUser(req, res) {
  const { confirmPassword } = req.body;
  let { name, email, password } = req.body;
  name = stripHtml(name).result.trim();
  email = stripHtml(email).result.trim();
  if (password !== confirmPassword) {
    return unprocessableResponse(res, { error: "Passwords do not match" });
  }
  password = bcrypt.hashSync(password, 10);
  try {
    const user = (
      await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])
    ).rows[0];
    if (user) {
      return conflictResponse(res, {
        error: "An user with this email is already registered",
      });
    }
    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, password]
    );
    return createdResponse(res);
  } catch (error) {
    return serverError(res, error);
  }
}

async function logUserIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = (
      await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])
    ).rows[0];
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return unauthorizedResponse(res, {
        error: `The password does not match the email.
Check your inputs and try again or create a new account.`,
      });
    }
    const config = { expiresIn: process.env.JWT_EXPIRES_IN };
    const token = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET,
      config
    );
    await connection.query(
      `INSERT INTO sessions (token, "userId") VALUES ($1, $2);`,
      [token, user.id]
    );
    return okResponse(res, token);
  } catch (error) {
    return serverError(res, error);
  }
}

export { createUser, logUserIn };
