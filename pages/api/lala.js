import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = "SELECT * FROM sales_receipt LIMIT 1000";
    const data = await query(querySql);

    res.status(200).json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
