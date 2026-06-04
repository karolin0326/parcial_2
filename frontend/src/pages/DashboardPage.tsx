import React from 'react';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { useDashboard } from '../hooks/useDashboard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { FileText, Users, ShieldAlert, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardPage = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="app-shell">
      <Sidebar />
      <div className="main-content">
          <Navbar title="Dashboard" />
          <div className="flex-1 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="app-shell">
      <Sidebar />
      <div className="main-content">
          <Navbar title="Dashboard" />
          <div className="p-6 text-[var(--danger)]">
            Error al cargar las métricas del dashboard.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Dashboard" />
        
        <main className="page-content">
          <div className="page-header">
            <div>
              <h1 className="page-title">Resumen de Facturación</h1>
              <p className="page-subtitle">Métricas principales y detección de anomalías con IA</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="kpi-grid">
            <div className="kpi-card c-primary">
              <div className="kpi-icon c-primary">
                <FileText size={24} />
              </div>
              <div>
                <div className="kpi-label">Total Facturas</div>
                <div className="kpi-value">{data.kpis.total_facturas_emitidas}</div>
              </div>
            </div>

            <div className="kpi-card c-success">
              <div className="kpi-icon c-success">
                <DollarSign size={24} />
              </div>
              <div>
                <div className="kpi-label">Volumen Facturado</div>
                <div className="kpi-value">${data.kpis.valor_total_facturado.toLocaleString('es-CO')}</div>
              </div>
            </div>

            <div className="kpi-card c-warning">
              <div className="kpi-icon c-warning">
                <Users size={24} />
              </div>
              <div>
                <div className="kpi-label">Clientes Activos</div>
                <div className="kpi-value">{data.kpis.total_clientes_activos}</div>
              </div>
            </div>

            <div className="kpi-card c-danger">
              <div className="kpi-icon c-danger">
                <ShieldAlert size={24} />
              </div>
              <div>
                <div className="kpi-label">Alertas IA Activas</div>
                <div className="kpi-value">{data.kpis.total_alertas_generadas_ia}</div>
                {data.kpis.total_alertas_generadas_ia > 0 && (
                  <div className="kpi-trend text-[var(--danger)] mt-1">
                    Requieren atención
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Gráfico de Anomalías */}
          <div className="card-glass mt-6">
            <div className="card-header">
              <h3 className="card-title">Tendencia de Detección de Anomalías</h3>
            </div>
            <div className="card-body" style={{ height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.anomalies_trend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAnomalias" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Area type="monotone" dataKey="normal" name="Facturas Normales" stroke="var(--primary)" fillOpacity={1} fill="url(#colorNormal)" />
                  <Area type="monotone" dataKey="anomalias" name="Anomalías Detectadas" stroke="var(--danger)" fillOpacity={1} fill="url(#colorAnomalias)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
