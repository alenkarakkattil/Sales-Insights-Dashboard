import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import salesRoutes from './routes/sales.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api', salesRoutes);


// Global error handler
app.use((err, _req, res, _next) => {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));