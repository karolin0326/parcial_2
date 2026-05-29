import os

base_path = r"c:\Users\user\Desktop\ingenieria de sofware 2\sistema-facturacion-ia\frontend\src"

files = {
    "hooks/useAuth.ts": """import { useAuthStore } from '../store/authStore';
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
""",
    "hooks/useFacturas.ts": """import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosClient from '../api/axiosClient';
import { FacturaCreateDTO } from '../types/factura.types';

export const useGetFacturas = (filters?: any) => {
  return useQuery({
    queryKey: ['facturas', filters],
    queryFn: async () => {
      const { data } = await axiosClient.get('/facturas', { params: filters });
      return data;
    }
  });
};

export const useCreateFactura = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (factura: FacturaCreateDTO) => {
      const { data } = await axiosClient.post('/facturas', factura);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facturas'] });
      toast.success('Factura registrada');
    },
    onError: () => toast.error('Error al registrar factura')
  });
};
""",
    "components/common/StatusBadge.tsx": """import React from 'react';
import { FacturaEstado } from '../../types/factura.types';
import { AlertaEstado } from '../../types/alerta.types';

interface Props {
  estado: FacturaEstado | AlertaEstado;
}

export const StatusBadge: React.FC<Props> = ({ estado }) => {
  const styles: Record<string, string> = {
    pendiente: 'bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]',
    validada: 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    anomalia: 'bg-[var(--danger-light)] text-[var(--danger)] border-[var(--danger)]',
    resuelta: 'bg-blue-100 text-blue-800 border-blue-400',
    revisada: 'bg-gray-100 text-gray-800 border-gray-400',
    anulada: 'bg-gray-200 text-gray-600 border-gray-300'
  };

  const className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[estado] || ''}`;

  return <span className={className}>{estado}</span>;
};
""",
    "components/common/Navbar.tsx": """import React from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAlertaStore } from '../../store/alertaStore';

export const Navbar = ({ title }: { title: string }) => {
  const { usuario } = useAuth();
  const alertasPendientes = useAlertaStore(state => state.alertasPendientes);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-500" />
          {alertasPendientes > 0 && (
            <span className="absolute -top-1 -right-1 bg-[var(--danger)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {alertasPendientes}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{usuario?.nombre}</span>
            <span className="text-xs text-gray-500 capitalize">{usuario?.rol}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
""",
    "router/AppRouter.tsx": """import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, hasRole } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !hasRole(allowedRoles as any)) return <div>403 Acceso Denegado</div>;
  return <>{children}</>;
};

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        {/* Placeholder for other routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};
""",
    "pages/LoginPage.tsx": """import React, { useState } from 'react';
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
      const { data } = await axiosClient.post('/auth/login', { correo, password });
      setAuth(data.usuario, data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--primary)]">Sistema IA</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Correo" 
            className="border p-2 rounded" 
            value={correo}
            onChange={e => setCorreo(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="text-[var(--danger)] text-sm">{error}</p>}
          <button type="submit" className="bg-[var(--primary)] text-white p-2 rounded hover:bg-blue-700">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
""",
    "pages/DashboardPage.tsx": """import React from 'react';
import { Navbar } from '../components/common/Navbar';

export const DashboardPage = () => {
  return (
    <div className="flex bg-[var(--surface)] min-h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar title="Dashboard" />
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen de Facturación</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* KPI Cards Placeholder */}
            <div className="bg-white p-4 rounded shadow border-l-4 border-[var(--primary)]">Total Facturas</div>
            <div className="bg-white p-4 rounded shadow border-l-4 border-[var(--danger)]">Anomalías</div>
            <div className="bg-white p-4 rounded shadow border-l-4 border-[var(--warning)]">Alertas</div>
            <div className="bg-white p-4 rounded shadow border-l-4 border-[var(--success)]">Tasa</div>
          </div>
        </main>
      </div>
    </div>
  );
};
""",
    "App.tsx": """import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './router/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_path, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

# Update index.css
css_path = os.path.join(base_path, "index.css")
with open(css_path, "w", encoding="utf-8") as f:
    f.write('''@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #185FA5;
  --primary-light: #E6F1FB;
  --danger: #E24B4A;
  --danger-light: #FCEBEB;
  --success: #3B6D11;
  --success-light: #EAF3DE;
  --warning: #BA7517;
  --warning-light: #FAEEDA;
  --surface: #F8F9FA;
  --card: #FFFFFF;
}

body {
  background-color: var(--surface);
  color: #333;
}
''')

print("Files generated successfully.")
