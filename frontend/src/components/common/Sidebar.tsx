import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAlertaStore } from '../../store/alertaStore';
import { Home, FileText, Users, AlertTriangle, FileBarChart, Shield, LogOut } from 'lucide-react';

export const Sidebar = () => {
  const { hasRole, logout, usuario } = useAuth();
  const alertasPendientes = useAlertaStore(state => state.alertasPendientes);

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Home, roles: ['contador', 'auditor', 'administrador'] },
    { to: '/facturas', label: 'Facturas', icon: FileText, roles: ['contador', 'administrador'] },
    { to: '/clientes', label: 'Clientes', icon: Users, roles: ['contador', 'administrador'] },
    { to: '/alertas', label: 'Alertas', icon: AlertTriangle, roles: ['contador', 'auditor', 'administrador'], badge: true },
    { to: '/reportes', label: 'Reportes', icon: FileBarChart, roles: ['auditor', 'administrador'] },
    { to: '/usuarios', label: 'Usuarios', icon: Users, roles: ['administrador'] },
    { to: '/auditoria', label: 'Auditoría', icon: Shield, roles: ['auditor', 'administrador'] },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-[var(--primary-light)] flex items-center gap-2">
          <Shield className="w-8 h-8 text-[var(--primary)]" />
          SysIA
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {links.filter(link => hasRole(link.roles as any)).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-[var(--primary)] text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <link.icon className="w-5 h-5" />
            <span className="flex-1">{link.label}</span>
            {link.badge && alertasPendientes > 0 && (
              <span className="bg-[var(--danger)] text-white text-xs font-bold px-2 py-1 rounded-full">
                {alertasPendientes}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-lg">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-medium">{usuario?.nombre}</p>
            <p className="text-xs text-gray-500 capitalize">{usuario?.rol}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
