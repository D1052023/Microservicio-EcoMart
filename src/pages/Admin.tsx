import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Cepillo de Bambú', category: 'Higiene', price: 5.99, stock: 100 },
  { id: 2, name: 'Termo Acero', category: 'Hogar', price: 19.99, stock: 50 },
];

export default function Admin() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.stock) return;
    
    setProducts([...products, { 
      id: Date.now(), 
      name: form.name,
      category: form.category,
      price: parseFloat(form.price), 
      stock: parseInt(form.stock) 
    }]);
    setForm({ name: '', category: '', price: '', stock: '' });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Formulario */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Crear Producto</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="block w-full border border-gray-200 p-2.5 rounded-lg focus:ring-brand-500 outline-none" placeholder="Ej. Jabón Orgánico" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
              <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="block w-full border border-gray-200 p-2.5 rounded-lg focus:ring-brand-500 outline-none" placeholder="Ej. Higiene" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Precio ($)</label>
                <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="block w-full border border-gray-200 p-2.5 rounded-lg focus:ring-brand-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="block w-full border border-gray-200 p-2.5 rounded-lg focus:ring-brand-500 outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow mt-4">
              Añadir Inventario
            </button>
          </form>
        </div>

        {/* Lista de Inventario */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-900">Inventario Actual</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-600 font-medium">{p.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {p.stock} uds
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-gray-500">Inventario vacío</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
