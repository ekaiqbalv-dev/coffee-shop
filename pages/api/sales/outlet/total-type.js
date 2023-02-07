import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        type, COUNT(type) as total
      FROM
        sales_outlet
      GROUP BY type
    `;
    const data = await query(querySql);

    res.status(200).json({ outlet: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
