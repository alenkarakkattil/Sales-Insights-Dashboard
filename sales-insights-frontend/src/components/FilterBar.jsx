import React from "react";

export default function FilterBar({ products, filters, setFilters, onApply }) {
  return (
    <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-2xl shadow mb-4">
      {/* From Date */}
      <div>
        <label className="block text-sm font-medium">From</label>
        <input
          type="date"
          value={filters.from}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="border rounded-lg px-2 py-1"
        />
      </div>

      {/* To Date */}
      <div>
        <label className="block text-sm font-medium">To</label>
        <input
          type="date"
          value={filters.to}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="border rounded-lg px-2 py-1"
        />
      </div>

      {/* Product */}
      <div>
        <label className="block text-sm font-medium">Product</label>
        <select
          value={filters.product}
          onChange={(e) => setFilters({ ...filters, product: e.target.value })}
          className="border rounded-lg px-2 py-1"
        >
          <option value="All">All</option>
          {products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}
