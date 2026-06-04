import React from 'react';
import { Bell } from 'lucide-react';
import { useAlertaStore } from '../../store/alertaStore';

export const Navbar = ({ title }: { title: string }) => {
  const alertasPendientes = useAlertaStore(state => state.alertasPendientes);

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <button className="topbar-icon-btn">
          <Bell size={18} />
          {alertasPendientes > 0 && (
            <span className="badge-dot">{alertasPendientes}</span>
          )}
        </button>
      </div>
    </header>
  );
};
