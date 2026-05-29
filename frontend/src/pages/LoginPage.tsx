import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', correo);
      formData.append('password', password);

      const { data } = await axiosClient.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      const usuarioInfo = {
        id_usuario: 0, 
        nombre: data.nombre,
        correo: data.correo,
        rol: data.rol.toLowerCase(),
        id_estado: 1
      };

      setAuth(usuarioInfo, data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="app-container items-center justify-center">
      <div className="card-glass w-full max-w-md p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--cyan)] rounded-full blur-3xl opacity-20 -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">SysIA</h2>
            <p className="text-gray-400 text-sm">Monitoreo de Facturación Contable</p>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                placeholder="ejemplo@empresa.com" 
                className="input-premium" 
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Contraseña</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="input-premium"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="bg-[var(--danger-bg)] border border-[var(--danger-border)] text-[var(--danger)] px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <button type="submit" className="btn-premium btn-primary-glow w-full mt-4 py-3">
              Iniciar Sesión
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              ¿Olvidó su contraseña? Contacte al administrador.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
