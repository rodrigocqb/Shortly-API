import { nanoid } from "nanoid";
import connection from "../database/database.js";
import {
  createdResponse,
  noContentResponse,
  notFoundResponse,
  okResponse,
  serverError,
  unauthorizedResponse,
} from "./controllers.helper.js";

async function shortenUrl(req, res) {
  const { url } = req.body;
  const { user } = res.locals;
  const shortUrl = nanoid(8);
  try {
    await connection.query(
      `INSERT INTO urls ("userId", "shortUrl", url) 
        VALUES ($1, $2, $3);`,
      [user.id, shortUrl, url]
    );
    return createdResponse(res, { shortUrl });
  } catch (error) {
    return serverError(res, error);
  }
}

function getUrl(req, res) {
  const { url } = res.locals;
  delete url.createdAt;
  delete url.userId;
  return okResponse(res, url);
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
      return notFoundResponse(res, { error: "URL not found" });
    }
    await connection.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [
      url.id,
    ]);
    return res.redirect(url.url);
  } catch (error) {
    return serverError(res, error);
  }
}

async function deleteUrl(req, res) {
  const { url, user } = res.locals;
  if (url.userId !== user.id) {
    return unauthorizedResponse(res, {
      error: "This URL is from another user",
    });
  }
  try {
    await connection.query(`DELETE FROM visits WHERE "urlId" = $1`, [url.id]);
    await connection.query(`DELETE FROM urls WHERE id = $1;`, [url.id]);
    return noContentResponse(res);
  } catch (error) {
    return serverError(res, error);
  }
}

export { shortenUrl, getUrl, openUrl, deleteUrl };
