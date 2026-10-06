import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular API asíncrona
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      setForm({ name: '', email: '', address: '' });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative animate-fade-in-up">
      <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo</label>
            <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 p-3 border outline-none transition-all" placeholder="Ej. Juan Pérez" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
            <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 p-3 border outline-none transition-all" placeholder="juan@ejemplo.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Envío</label>
            <textarea required value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="block w-full rounded-lg border-gray-200 shadow-sm focus:border-brand-500 focus:ring-brand-500 p-3 border outline-none transition-all resize-none" rows={3} placeholder="Calle Principal 123..."></textarea>
          </div>
          
          <div className="pt-6 border-t border-gray-100 mt-6">
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando Pago...
                </>
              ) : 'Confirmar y Pagar'}
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center space-y-5 shadow-2xl animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-brand-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">✓</div>
            <h2 className="text-2xl font-extrabold text-gray-900">¡Compra Exitosa!</h2>
            <p className="text-gray-600">Tu pedido ecológico está en camino y has ayudado a reducir el CO2.</p>
            <Link to="/dashboard" onClick={() => setShowModal(false)} className="block w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-md mt-4">
              Volver al Catálogo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
