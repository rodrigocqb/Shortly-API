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

export { shortenUrl };
