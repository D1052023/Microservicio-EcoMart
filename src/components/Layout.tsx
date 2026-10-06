import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-brand-600">EcoMart</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Inicio</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</Link>
              <Link to="/checkout" className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Checkout</Link>
              <Link to="/admin" className="text-gray-700 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</Link>
            </nav>
            <div className="flex items-center">
              <button className="bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm">
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
