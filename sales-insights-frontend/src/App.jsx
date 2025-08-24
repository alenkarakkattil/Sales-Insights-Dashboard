import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchSummary, fetchDaily } from './api';
import FilterBar from './components/FilterBar';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';

export default function App() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ product: 'All', from: '', to: '' });
  const [summary, setSummary] = useState([]);
  const [daily, setDaily] = useState([]);

  // Function to load data from API
  const load = async () => {
    const [sum, day] = await Promise.all([
      fetchSummary({
        from: filters.from || undefined,
        to: filters.to || undefined,
      }),
      fetchDaily({
        product: filters.product,
        from: filters.from || undefined,
        to: filters.to || undefined,
      }),
    ]);
    setSummary(sum);
    setDaily(day);
  };

  // Load products list + initial data
  useEffect(() => {
    fetchProducts().then(setProducts);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">📊 Sales Insights Dashboard</h1>

      {/* Filters */}
      <FilterBar
        products={products}
        filters={filters}
        setFilters={setFilters}
        onApply={load}
      />

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-2">
          <BarChart
            data={summary}
            onBarClick={(p) => {
              // Clicking a bar filters by that product
              setFilters((f) => ({ ...f, product: p }));
              fetchDaily({
                product: p,
                from: filters.from || undefined,
                to: filters.to || undefined,
              }).then(setDaily);
            }}
          />
        </div>
        <div className="bg-white rounded-2xl shadow p-2">
          <PieChart data={summary} />
        </div>
        <div className="bg-white rounded-2xl shadow p-2 md:col-span-2">
          <LineChart rows={daily} />
        </div>
      </div>
    </div>
  );
}
