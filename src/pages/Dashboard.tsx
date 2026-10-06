import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Cepillo de Bambú', category: 'Higiene', price: 5.99, co2: 0.5, stock: 100 },
  { id: 2, name: 'Termo Acero Inoxidable', category: 'Hogar', price: 19.99, co2: 2.1, stock: 50 },
  { id: 3, name: 'Bolsas Reutilizables', category: 'Hogar', price: 8.50, co2: 1.2, stock: 200 },
  { id: 4, name: 'Jabón Biodegradable', category: 'Higiene', price: 4.99, co2: 0.3, stock: 80 },
];

export default function Dashboard() {
  const [filter, setFilter] = useState('Todos');
  
  const filteredProducts = filter === 'Todos' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  const totalCO2 = MOCK_PRODUCTS.reduce((acc, p) => acc + p.co2, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
        <div className="glass px-4 py-2 rounded-lg text-sm text-brand-900 font-bold border-brand-200">
          🌱 CO2 Ahorrado Global: {totalCO2.toFixed(1)} kg
        </div>
      </div>

      <div className="flex gap-2">
        {['Todos', 'Higiene', 'Hogar'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === cat ? 'bg-brand-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-100 border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col group">
            <div className="h-40 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="text-5xl drop-shadow-sm">🪴</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{product.name}</h3>
            <p className="text-sm text-brand-600 font-medium mb-2">{product.category}</p>
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
              <Link to="/checkout" className="bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-brand-200 transition-colors">
                Comprar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
