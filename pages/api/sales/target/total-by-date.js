import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        date,
        SUM(beans_goal) AS beans,
        SUM(beverage_goal) AS beverage,
        SUM(food_goal) AS food,
        SUM(merchandise_goal) AS merchandise
      FROM
        sales_target
      WHERE
        date = ?
      GROUP BY date
    `;
    const params = Object.values(req.query);
    const data = await query(querySql, params);

    if (data.length > 0) {
      res.status(200).json({ target: data[0] });
    } else {
      res.status(200).json({
        target: {
          date: req.query.date,
          beans: 0,
          beverage: 0,
          food: 0,
          merchandise: 0,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
