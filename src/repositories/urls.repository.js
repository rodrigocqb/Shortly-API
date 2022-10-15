import connection from "../database/database.js";

const TABLE = "urls";

async function insertUrl(userId, shortUrl, url) {
  await connection.query(
    `INSERT INTO ${TABLE} ("userId", "shortUrl", url) 
          VALUES ($1, $2, $3);`,
    [userId, shortUrl, url]
  );
  return;
}

async function selectUrlById(id) {
  const url = (
    await connection.query(`SELECT * FROM ${TABLE} WHERE id = $1;`, [id])
  ).rows[0];
  return url;
}

async function selectUrlByShortUrl(shortUrl) {
  const url = (
    await connection.query(`SELECT * FROM ${TABLE} WHERE "shortUrl" = $1;`, [
      shortUrl,
    ])
  ).rows[0];
  return url;
}

async function insertVisit(urlId) {
  await connection.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [urlId]);
  return;
}

async function deleteVisitsFromUrl(urlId) {
  await connection.query(`DELETE FROM visits WHERE "urlId" = $1`, [urlId]);
  return;
}

async function deleteUrl(id) {
  await connection.query(`DELETE FROM ${TABLE} WHERE id = $1;`, [id]);
  return;
}

export {
  insertUrl,
  selectUrlById,
  selectUrlByShortUrl,
  insertVisit,
  deleteVisitsFromUrl,
  deleteUrl,
};
