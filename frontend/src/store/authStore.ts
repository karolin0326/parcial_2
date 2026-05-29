import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario } from '../types/usuario.types';

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,
      setAuth: (usuario, token) => set({ usuario, token, isAuthenticated: true }),
      logout: () => set({ usuario: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
