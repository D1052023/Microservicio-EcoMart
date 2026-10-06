import React from 'react';

export default function Home() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-600 opacity-90"></div>
        <div className="relative px-8 py-16 sm:px-16 sm:py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bienvenido a <span className="text-brand-100">EcoMart</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-brand-50">
            La plataforma líder en productos sustentables. Únete a nuestra misión de cuidar el planeta.
          </p>
          <div className="mt-10 flex space-x-4">
            <button className="bg-white text-brand-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-brand-50 transition-colors shadow-lg">
              Explorar Productos
            </button>
          </div>
        </div>
      </div>

      {/* Stats/Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Productos Ecológicos', desc: '100% amigables con el medio ambiente.' },
          { title: 'Envíos Neutros', desc: 'Compensamos la huella de carbono de cada envío.' },
          { title: 'Comunidad', desc: 'Únete a miles de personas comprometidas.' },
        ].map((feature, idx) => (
          <div key={idx} className="glass p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
