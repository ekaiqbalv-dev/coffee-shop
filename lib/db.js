import mysql from "mysql2/promise";

export async function query(query, params = []) {
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });
  try {
    const [results] = await dbconnection.execute(query, params);
    dbconnection.end();
    return results;
  } catch (error) {
    return { error };
  }
}
