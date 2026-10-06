import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
      <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Cargando EcoMart...</p>
    </div>
  );
}
