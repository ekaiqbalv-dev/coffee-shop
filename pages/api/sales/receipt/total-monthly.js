import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        DATE(transaction_datetime) AS date,
        COUNT(quantity) AS transaction,
        SUM(quantity) AS quantity,
        SUM(line_item_amount) AS sales
      FROM
        sales_receipt
      WHERE
        MONTH(transaction_datetime) = ?
          AND YEAR(transaction_datetime) = ?
      GROUP BY DATE(transaction_datetime)
    `;
    const params = Object.values(req.query);
    const data = await query(querySql, params);
    res.status(200).json({ receipt: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
