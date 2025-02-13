import mysql from "mysql2/promise";

export async function executeQuery({ query, values = [] }) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || "3306"),
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const [results] = await connection.execute(query, values);
      connection.end();
      return results;
    } catch (error) {
      return { error };
    }
  } catch (error) {
    return { error };
  }
}
