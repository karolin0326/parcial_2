import React, { useState } from 'react';
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
    <div className="flex bg-[var(--bg-main)] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
        <Navbar title="Gestión de Facturas" />
        <main className="page-content">
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
