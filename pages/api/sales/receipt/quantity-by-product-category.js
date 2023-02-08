import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
    SELECT 
      name,
      quantity,
      CASE
        WHEN quantity < 1000 THEN 'Low sold'
        WHEN quantity >= 1000 AND quantity < 2000 THEN 'Medium sold'
        ELSE 'High sold'
      END AS 'status'
    FROM
      (SELECT 
        name, SUM(total_quantity_by_product) AS quantity
      FROM
        (SELECT 
        product.id, product_category.name AS name
      FROM
        product
      INNER JOIN product_category ON product.product_category_id = product_category.id) AS A
      INNER JOIN (SELECT 
        product_id, SUM(quantity) AS total_quantity_by_product
      FROM
        sales_receipt
      WHERE
        DATE(transaction_datetime) BETWEEN ? AND ?
      GROUP BY product_id) AS B ON A.id = B.product_id
      GROUP BY name) AS C
    `;
    const [start, end] = Object.values(JSON.parse(JSON.stringify(req.query)));
    const data = await query(querySql, [start, end]);
    res.status(200).json({ product_category: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
