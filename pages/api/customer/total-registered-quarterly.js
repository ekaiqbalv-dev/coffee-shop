import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        QUARTER(registered_date) AS quarter,
        YEAR(registered_date) AS year,
        COUNT(id) AS total_registered_customer
      FROM
        customer
      GROUP BY QUARTER(registered_date), YEAR(registered_date)
    `;
    const data = await query(querySql);
    const formattedData = data.map((item) => ({
      quarter: `Q${item.quarter} ${item.year}`,
      total_registered_customer: item.total_registered_customer,
    }));
    res.status(200).json({ customer: formattedData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
