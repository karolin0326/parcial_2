import React from 'react';
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
