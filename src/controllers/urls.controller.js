import { nanoid } from "nanoid";
import connection from "../database/database.js";
import { urlSchema } from "../schemas/urlSchema.js";

async function shortenUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;
  const validation = urlSchema.validate(req.body, { abortEarly: true });
  if (validation.error) {
    const error = validation.error.details[0].message;
    return res.status(422).send(error);
  }
  const shortUrl = nanoid(8);
  try {
    await connection.query(
      `INSERT INTO urls ("userId", "shortUrl", url) 
        VALUES ($1, $2, $3);`,
      [user.id, shortUrl, url]
    );
    return res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

function getUrl(req, res) {
  const { url } = res.locals;
  delete url.createdAt;
  delete url.userId;
  return res.status(200).send(url);
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = (
      await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
        shortUrl,
      ])
    ).rows[0];
    if (!url) {
      return res.status(404).send({ error: "URL not found" });
    }
    await connection.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [
      url.id,
    ]);
    return res.redirect(url.url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUrl(req, res) {
  const { url, user } = res.locals;
  if (url.userId !== user.id) {
    return res.status(401).send({ error: "This URL is from another user" });
  }
  try {
    await connection.query(`DELETE FROM visits WHERE "urlId" = $1`, [url.id]);
    await connection.query(`DELETE FROM urls WHERE id = $1;`, [url.id]);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
