// src/components/LoadingSpinner.tsx
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="spinner">Cargando...</div>
    </div>
  );
}
