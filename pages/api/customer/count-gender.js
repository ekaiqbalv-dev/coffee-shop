import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        CASE gender
          WHEN "M" THEN 'Male'
          WHEN "F" THEN 'Female'
          ELSE 'Not Stated'
        END AS 'gender', count(gender) as total_gender
      FROM
        customer
      GROUP BY gender
    `;
    const data = await query(querySql);

    res.status(200).json({ customer: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
