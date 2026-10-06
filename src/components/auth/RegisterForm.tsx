// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

// Tipado estricto
interface FormState {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sanitización básica de inputs (prevenir caracteres peligrosos)
  const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: sanitizeInput(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (signUpError) {
        // Prevención de fuga de metadatos en excepciones
        setError('Ocurrió un error en el registro. Por favor, verifica tus datos.');
      } else {
        // Éxito
        alert('Registro exitoso. Revisa tu correo.');
      }
    } catch (err) {
      // Manejo genérico para no exponer detalles internos
      setError('Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {error && <div className="error-message">{error}</div>}
      
      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          value={form.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input 
          id="password"
          name="password" 
          type="password" 
          value={form.password} 
          onChange={handleChange} 
          required 
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}
