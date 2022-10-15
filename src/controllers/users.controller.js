import connection from "../database/database.js";
import { okResponse, serverError } from "./controllers.helper.js";

async function getUser(req, res) {
  const { user } = res.locals;
  try {
    const userData = (
      await connection.query(
        `SELECT users.id, users.name, 
        COUNT(visits.id) AS "visitCount" 
        FROM users LEFT JOIN urls ON
        users.id = urls."userId" LEFT JOIN visits ON
        urls.id = visits."urlId" 
        WHERE users.id = $1 GROUP BY users.id;`,
        [user.id]
      )
    ).rows[0];
    const userUrls = (
      await connection.query(
        `SELECT urls.id, urls."shortUrl", urls.url, 
        COUNT(visits.id) AS "visitCount" 
         FROM users JOIN urls ON
        users.id = urls."userId" LEFT JOIN visits ON
        urls.id = visits."urlId" 
        WHERE users.id = $1 GROUP BY urls.id;`,
        [user.id]
      )
    ).rows;
    userData.shortenedUrls = userUrls;
    return okResponse(res, userData);
  } catch (error) {
    return serverError(res, error);
  }
}

async function getRanking(req, res) {
  try {
    const users = (
      await connection.query(`SELECT users.id, users.name, 
      COUNT(DISTINCT urls.id) AS "linkCount", 
      COUNT(visits.id) AS "visitCount"
      FROM users LEFT JOIN urls ON
      users.id = urls."userId" LEFT JOIN visits ON
      urls.id = visits."urlId" GROUP BY users.id
      ORDER BY "visitCount" DESC LIMIT 10;`)
    ).rows;
    return okResponse(res, users);
  } catch (error) {
    return serverError(res, error);
  }
}

export { getUser, getRanking };
