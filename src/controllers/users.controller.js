import connection from "../database/database.js";

async function getUser(req, res) {
  const { user } = res.locals;
  try {
    const userData = (
      await connection.query(
        `SELECT users.id, users.name, 
        COALESCE(SUM(COALESCE(
            (SELECT COUNT(visits.id) FROM visits 
            WHERE visits."urlId" = urls.id ),0)), 0) AS "visitCount"
            FROM users JOIN urls ON users.id = urls."userId"
            JOIN visits ON urls.id = visits."urlId"
            WHERE users.id = $1
            GROUP BY users.id;`,
        [user.id]
      )
    ).rows[0];
    const userUrls = (
      await connection.query(`SELECT urls.id, urls."shortUrl", urls.url, 
    COALESCE((SELECT COUNT(visits.id) 
    FROM visits WHERE visits."urlId" = urls.id), 0) AS "visitCount"
    FROM urls JOIN users ON users.id = urls."userId"
    WHERE users.id = 1
    GROUP BY urls.id;`)
    ).rows;
    userData.shortenedUrls = userUrls;
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { getUser };
