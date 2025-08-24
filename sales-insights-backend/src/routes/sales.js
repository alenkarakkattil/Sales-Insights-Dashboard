import { Router } from 'express';
import { pool } from '../db.js';


const router = Router();


// Health
router.get('/health', (_req, res) => res.json({ status: 'ok' }));


// Distinct products (for dropdown)
router.get('/products', async (_req, res, next) => {
try {
const [rows] = await pool.query(
'SELECT DISTINCT product_name FROM sales_data ORDER BY product_name;'
);
res.json(rows.map(r => r.product_name));
} catch (e) { next(e); }
});


// Summary by product with optional filters: from, to
router.get('/summary', async (req, res, next) => {
try {
const { from, to } = req.query;
const where = [];
const params = [];
if (from) { where.push('sale_date >= ?'); params.push(from); }
if (to) { where.push('sale_date <= ?'); params.push(to); }
const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';


const sql = `
SELECT product_name, SUM(sales) AS total_sales
FROM sales_data
${whereSql}
GROUP BY product_name
ORDER BY total_sales DESC;`;


const [rows] = await pool.query(sql, params);
res.json(rows);
} catch (e) { next(e); }
});


// Daily series, optional product filter and date range
router.get('/daily', async (req, res, next) => {
try {
const { product, from, to } = req.query;
const where = [];
const params = [];
if (product && product !== 'All') { where.push('product_name = ?'); params.push(product); }
if (from) { where.push('sale_date >= ?'); params.push(from); }
if (to) { where.push('sale_date <= ?'); params.push(to); }
const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';


const sql = `
SELECT sale_date, product_name, SUM(sales) AS total_sales
FROM sales_data
${whereSql}
GROUP BY sale_date, product_name
ORDER BY sale_date ASC;`;


const [rows] = await pool.query(sql, params);
res.json(rows);
} catch (e) { next(e); }
});


export default router;