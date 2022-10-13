import connection from "../database/database.js";

async function getUser(req, res) {
  const { user } = res.locals;
  try {
    const userData = (
      await connection.query(
        `SELECT users.id, users.name, 
        COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users JOIN urls on users.id = urls."userId" 
        WHERE users.id = $1
        GROUP BY users.id;`,
        [user.id]
      )
    ).rows[0];
    const userUrls = (
      await connection.query(
        `SELECT urls.id, urls."shortUrl", urls.url, 
        urls."visitCount" FROM urls
      JOIN users on urls."userId" = users.id
      WHERE users.id = $1;`,
        [user.id]
      )
    ).rows;
    userData.shortenedUrls = userUrls;
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getRanking(req, res) {
  try {
    const users = (
      await connection.query(`SELECT users.id, users.name, 
      COALESCE(COUNT(urls.id), 0) AS "linksCount",
    COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
    FROM users LEFT JOIN urls on users.id = urls."userId" 
    GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`)
    ).rows;
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getUser, getRanking };
