import connection from "../database/database.js";

async function urlExists(req, res, next) {
  const { id } = req.params;
  try {
    const url = (
      await connection.query(`SELECT * FROM urls WHERE id = $1;`, [id])
    ).rows[0];
    if (!url) {
      return res.status(404).send({ error: "URL not found" });
    }
    res.locals.url = url;
    return next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export default urlExists;
