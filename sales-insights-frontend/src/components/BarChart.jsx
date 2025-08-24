import React from 'react';
import Plot from 'react-plotly.js';


export default function BarChart({ data, onBarClick }) {
return (
<Plot
data={[{
x: data.map(d => d.product_name),
y: data.map(d => d.total_sales),
type: 'bar'
}]}
layout={{ title: 'Total Sales by Product', margin: { t: 40 } }}
onClick={(evt) => {
const p = evt.points?.[0]?.x;
if (p && onBarClick) onBarClick(p);
}}
className="w-full"
/>
);
}