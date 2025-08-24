import React from 'react';
import Plot from 'react-plotly.js';


export default function LineChart({ rows }) {
// group by product
const byProduct = rows.reduce((acc, r) => {
(acc[r.product_name] ||= []).push(r);
return acc;
}, {});


const series = Object.entries(byProduct).map(([name, arr]) => ({
x: arr.map(r => r.sale_date),
y: arr.map(r => r.total_sales),
type: 'scatter',
mode: 'lines+markers',
name
}));


return (
<Plot
data={series}
layout={{ title: 'Daily Sales Trend', xaxis: { type: 'date' }, margin: { t: 40 } }}
className="w-full"
/>
);
}