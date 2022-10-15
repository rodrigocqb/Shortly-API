import connection from "../database/database.js";

const TABLE = "users";

async function selectUserData(userId) {
  const userData = (
    await connection.query(
      `SELECT ${TABLE}.id, ${TABLE}.name, 
          COUNT(visits.id) AS "visitCount" 
          FROM ${TABLE} LEFT JOIN urls ON
          ${TABLE}.id = urls."userId" LEFT JOIN visits ON
          urls.id = visits."urlId" 
          WHERE ${TABLE}.id = $1 GROUP BY ${TABLE}.id;`,
      [userId]
    )
  ).rows[0];
  return userData;
}

async function selectUserUrls(userId) {
  const userUrls = (
    await connection.query(
      `SELECT urls.id, urls."shortUrl", urls.url, 
          COUNT(visits.id) AS "visitCount" 
           FROM ${TABLE} JOIN urls ON
          ${TABLE}.id = urls."userId" LEFT JOIN visits ON
          urls.id = visits."urlId" 
          WHERE ${TABLE}.id = $1 GROUP BY urls.id;`,
      [userId]
    )
  ).rows;
  return userUrls;
}

async function selectRanking() {
  const users = (
    await connection.query(`SELECT ${TABLE}.id, ${TABLE}.name, 
        COUNT(DISTINCT urls.id) AS "linkCount", 
        COUNT(visits.id) AS "visitCount"
        FROM ${TABLE} LEFT JOIN urls ON
        ${TABLE}.id = urls."userId" LEFT JOIN visits ON
        urls.id = visits."urlId" GROUP BY ${TABLE}.id
        ORDER BY "visitCount" DESC LIMIT 10;`)
  ).rows;
  return users;
}

export { selectUserData, selectUserUrls, selectRanking };
