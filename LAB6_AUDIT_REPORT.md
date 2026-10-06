# Informe de Auditoría y Optimización (Laboratorio 6) - EcoMart

## Sección 1: Informe de Auditoría de Ciberseguridad

Durante la auditoría de la plataforma "EcoMart", se detectaron y remediaron tres vulnerabilidades críticas:

1. **Políticas RLS (Row Level Security) Permisivas:**
   * **Hallazgo:** Las tablas sensibles como `profiles` y `orders` tenían políticas que permitían lectura y escritura indiscriminada (`USING (true)`).
   * **Solución Técnica:** Se refactorizó el esquema en `supabase/security_hardening.sql`, implementando políticas estrictas donde las consultas filtran exclusivamente por el identificador del usuario autenticado: `USING (auth.uid() = id)` para perfiles y `USING (auth.uid() = user_id)` para órdenes.

2. **Exposición Potencial de Claves Privadas (Service Role Key):**
   * **Hallazgo:** Riesgo de inyección de credenciales administrativas en el bundle del cliente.
   * **Solución Técnica:** En `src/utils/supabase.ts`, se forzó el uso estricto de variables públicas de Vite (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`), garantizando que la `SERVICE_ROLE_KEY` permanezca aislada en el entorno backend.

3. **Falta de Sanitización y Exposición de Metadatos en Excepciones:**
   * **Hallazgo:** Los formularios de entrada carecían de validaciones contra caracteres peligrosos (XSS) y los errores de autenticación filtraban metadatos internos de la base de datos.
   * **Solución Técnica:** En componentes como `RegisterForm.tsx`, se aplicó una sanitización de entradas (`input.replace(/[<>]/g, '')`) y un enmascaramiento genérico de errores (`Ocurrió un error en el registro`) para evitar fugas de información.

---

## Sección 2: Comparativa de Optimización del Bundle

Se implementó **Code Splitting** y **Lazy Loading** para mejorar las métricas de **Core Web Vitals**.

### Métricas (Estimadas)
| Métrica | ANTES (Monolito) | DESPUÉS (Code Splitting) | Impacto |
| :--- | :--- | :--- | :--- |
| **Tamaño del Bundle Inicial** | ~1.2 MB | ~300 KB | Reducción del 75% |
| **LCP (Largest Contentful Paint)** | 3.5s (Pobre) | 1.2s (Bueno) | Mejora de 2.3s |
| **FID (First Input Delay)** | 150ms (Necesita mejora) | 40ms (Bueno) | Mejora de 110ms |

### Configuración Aplicada
En `vite.config.ts`, se implementó el `manualChunks` para separar dependencias pesadas:
```typescript
manualChunks: {
  'vendor-react': ['react', 'react-dom', 'react-router-dom'],
  'vendor-supabase': ['@supabase/supabase-js']
}
```
Y en `src/App.tsx`, las páginas principales (`Home`, `Dashboard`, `Checkout`, `Admin`) se cargan ahora mediante `React.lazy()` envueltas en un `<Suspense fallback={<LoadingSpinner />}>`.

---

## Sección 3: Fragmento de Código Refactorizado

El siguiente es el código implementado en `src/components/auth/RegisterForm.tsx` que aplica las mejores prácticas de tipado estricto, estados de carga y sanitización.

```tsx
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

  // Sanitización básica de inputs (prevenir XSS)
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
        // Enmascaramiento de errores
        setError('Ocurrió un error en el registro. Por favor, verifica tus datos.');
      } else {
        alert('Registro exitoso. Revisa tu correo.');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (renderizado del formulario)
}
```
