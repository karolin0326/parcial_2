import React from 'react';
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
