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
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="flex items-center gap-2">
          <Shield className="w-7 h-7 text-[var(--primary)]" />
          <div className="sidebar-logo-title">SysIA</div>
        </div>
        <div className="sidebar-logo-sub">Monitoreo Contable</div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Menú Principal</div>
        {links.filter(link => hasRole(link.roles as any)).map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <link.icon />
            <span style={{ flex: 1 }}>{link.label}</span>
            {link.badge && alertasPendientes > 0 && (
              <span className="bg-[var(--danger)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {alertasPendientes}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-chip" onClick={logout} title="Cerrar Sesión">
          <div className="user-avatar">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div className="user-info-name">{usuario?.nombre}</div>
            <div className="user-info-role capitalize">{usuario?.rol}</div>
          </div>
          <LogOut size={16} className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors" />
        </div>
      </div>
    </aside>
  );
};
