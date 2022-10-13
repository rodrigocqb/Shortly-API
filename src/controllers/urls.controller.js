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
        VALUES ($1, $2, $3)`,
      [user.id, shortUrl, url]
    );
    res.status(201).send({ shortUrl });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

function getUrl(req, res) {
  const { url } = res.locals;
  res.status(200).send(url);
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = (
      await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
        shortUrl,
      ])
    ).rows[0];
    if (!url) {
      return res.status(404).send({ error: "URL not found" });
    }
    await connection.query(`INSERT INTO visits ("urlId") VALUES ($1)`, [
      url.id,
    ]);
    return res.redirect(url.url);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { shortenUrl, getUrl, openUrl };
