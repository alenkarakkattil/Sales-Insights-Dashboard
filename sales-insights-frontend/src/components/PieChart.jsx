import React from 'react';
import Plot from 'react-plotly.js';


export default function PieChart({ data }) {
return (
<Plot
data={[{
labels: data.map(d => d.product_name),
values: data.map(d => d.total_sales),
type: 'pie',
hole: 0.4
}]}
layout={{ title: 'Share by Product', margin: { t: 40 } }}
className="w-full"
/>
);
}