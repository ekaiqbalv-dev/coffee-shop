import { query } from "@/lib/db";

export default async function handler(req, res) {
  try {
    const querySql = `
      SELECT 
        generation.name, COUNT(generation.name) as total_generation
      FROM
        customer
          LEFT JOIN
        generation ON YEAR(customer.birthdate) BETWEEN generation.start_year AND generation.end_year
      GROUP BY generation.name
    `;
    const data = await query(querySql);

    res.status(200).json({ customer: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
