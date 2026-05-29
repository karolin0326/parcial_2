import os

base_path = r"c:\Users\user\Desktop\ingenieria de sofware 2\sistema-facturacion-ia\frontend\src"

files = {
    "components/common/Sidebar.tsx": """import React from 'react';
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
""",
    "components/common/Table.tsx": """import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function Table<T extends Record<string, any>>({ columns, data, isLoading, emptyMessage = 'No hay datos' }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full animate-pulse flex flex-col gap-2 mt-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-12 bg-gray-200 rounded-md w-full"></div>
        ))}
      </div>
    );
  }

  if (!data.length) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto mt-4 rounded-lg shadow border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-3">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
""",
    "components/common/Modal.tsx": """import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: Props) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-in fade-in">
      <div className={`bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]} overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};
""",
    "pages/FacturasPage.tsx": """import React, { useState } from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';
import { Table } from '../components/common/Table';
import { Modal } from '../components/common/Modal';
import { StatusBadge } from '../components/common/StatusBadge';
import { Plus, Eye, Ban } from 'lucide-react';
import { useGetFacturas, useAnularFactura } from '../hooks/useFacturas';
import { Factura } from '../types/factura.types';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export const FacturasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facturas, isLoading } = useGetFacturas();
  const anularMutation = useAnularFactura();

  const handleAnular = (id: number) => {
    if (window.confirm('¿Está seguro de anular esta factura?')) {
      anularMutation.mutate(id);
    }
  };

  const columns = [
    { key: 'numero_factura', header: 'N° Factura' },
    { key: 'fecha', header: 'Fecha', render: (row: Factura) => format(new Date(row.fecha), 'dd/MM/yyyy') },
    { key: 'estado', header: 'Estado', render: (row: Factura) => <StatusBadge estado={row.estado} /> },
    { 
      key: 'acciones', 
      header: 'Acciones',
      render: (row: Factura) => (
        <div className="flex gap-2">
          <button className="p-1 text-[var(--primary)] hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
          {row.estado !== 'anulada' && (
            <button onClick={() => handleAnular(row.id_factura)} className="p-1 text-[var(--danger)] hover:bg-red-50 rounded"><Ban className="w-4 h-4" /></button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="flex bg-[var(--surface)] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar title="Gestión de Facturas" />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Listado de Facturas</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" /> Nueva Factura
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <Table 
              columns={columns} 
              data={facturas || []} 
              isLoading={isLoading} 
              emptyMessage="No se encontraron facturas" 
            />
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nueva Factura" size="lg">
        <div>Aquí irá el formulario de nueva factura...</div>
      </Modal>
    </div>
  );
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
      toast.success('Factura registrada correctamente');
    },
    onError: () => toast.error('Error al registrar la factura')
  });
};

export const useAnularFactura = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.post(`/facturas/${id}/anular`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facturas'] });
      toast.success('Factura anulada correctamente');
    },
    onError: () => toast.error('Error al anular la factura')
  });
};
""",
    "api/facturas.api.ts": """import axiosClient from './axiosClient';
import { FacturaCreateDTO } from '../types/factura.types';

export const getFacturas = async (params?: any) => {
  const { data } = await axiosClient.get('/facturas', { params });
  return data;
};

export const getFacturaById = async (id: number) => {
  const { data } = await axiosClient.get(`/facturas/${id}`);
  return data;
};

export const createFactura = async (factura: FacturaCreateDTO) => {
  const { data } = await axiosClient.post('/facturas', factura);
  return data;
};

export const anularFactura = async (id: number) => {
  const { data } = await axiosClient.post(`/facturas/${id}/anular`);
  return data;
};
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_path, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Phase 2 files generated successfully.")
