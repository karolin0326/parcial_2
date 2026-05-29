import { useAuthStore } from '../store/authStore';
import { Rol } from '../types/usuario.types';

export const useAuth = () => {
  const { usuario, isAuthenticated, logout } = useAuthStore();
  
  const hasRole = (rol: Rol | Rol[]) => {
    if (!usuario) return false;
    if (Array.isArray(rol)) return rol.includes(usuario.rol);
    return usuario.rol === rol;
  };
  
  return { usuario, isAuthenticated, logout, hasRole };
};
