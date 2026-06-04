import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { FacturasPage } from '../pages/FacturasPage';
import ClientesPage from '../pages/ClientesPage';
import AlertasPage from '../pages/AlertasPage';
import ReportesPage from '../pages/ReportesPage';
import UsuariosPage from '../pages/UsuariosPage';
import AuditoriaPage from '../pages/AuditoriaPage';

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
        <Route path="/facturas" element={<ProtectedRoute><FacturasPage /></ProtectedRoute>} />
        <Route path="/clientes" element={<ProtectedRoute><ClientesPage /></ProtectedRoute>} />
        <Route path="/alertas" element={<ProtectedRoute><AlertasPage /></ProtectedRoute>} />
        <Route path="/reportes" element={<ProtectedRoute><ReportesPage /></ProtectedRoute>} />
        <Route path="/usuarios" element={<ProtectedRoute allowedRoles={['administrador']}><UsuariosPage /></ProtectedRoute>} />
        <Route path="/auditoria" element={<ProtectedRoute allowedRoles={['auditor']}><AuditoriaPage /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};
