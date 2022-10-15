import {
  notFoundResponse,
  serverError,
} from "../controllers/controllers.helper.js";
import connection from "../database/database.js";

async function urlExists(req, res, next) {
  const { id } = req.params;
  try {
    const url = (
      await connection.query(`SELECT * FROM urls WHERE id = $1;`, [id])
    ).rows[0];
    if (!url) {
      return notFoundResponse(res, { error: "URL not found" });
    }
    res.locals.url = url;
    return next();
  } catch (error) {
    return serverError(res, error);
  }
}

export default urlExists;
