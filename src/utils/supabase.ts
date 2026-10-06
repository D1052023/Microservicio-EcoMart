// src/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Usamos estrictamente variables públicas de Vite. 
// Nunca exponer SUPABASE_SERVICE_ROLE_KEY en el frontend.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las credenciales de Supabase no están configuradas.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
