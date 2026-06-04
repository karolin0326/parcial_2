import React, { useState } from 'react'
import { Sidebar } from '../components/common/Sidebar'
import { Navbar } from '../components/common/Navbar'
import { reportesApi } from '../api/reportes.api'
import { FilePieChart, Search, TrendingUp, AlertTriangle, FileCheck } from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

const ReportesPage: React.FC = () => {
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [reporte, setReporte] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerar = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await reportesApi.diario(fecha)
      setReporte(data)
    } catch (e: any) {
      setError('No se pudo generar el reporte. Verifique la conexión con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex bg-[var(--bg-main)] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
        <Navbar title="Reportes" />
        <main className="page-content">
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <FilePieChart size={22} color="var(--cyan)" />
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                Reportes de Facturación
              </h1>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              RF04 · Generación automática de reportes diarios con análisis de anomalías
            </p>
          </div>

          {/* Selector de Fecha */}
          <div className="card-glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Fecha del Reporte
                </label>
                <input
                  type="date"
                  className="input-premium"
                  value={fecha}
                  onChange={e => setFecha(e.target.value)}
                />
              </div>
              <button
                id="btn-generar-reporte"
                onClick={handleGenerar}
                className="btn-premium btn-primary-glow"
                disabled={loading}
              >
                <Search size={17} />
                {loading ? 'Generando...' : 'Generar Reporte'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.9rem 1.25rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              ⚠️ {error}
            </div>
          )}

          {loading && <LoadingSpinner />}

          {reporte && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Métricas del Reporte */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {[
                  { label: 'Facturas del Día', value: reporte.total_facturas_emitidas, icon: <FileCheck size={20} />, color: 'var(--primary)', glow: 'rgba(99,102,241,0.2)' },
                  { label: 'Total Facturado', value: formatCurrency(reporte.valor_total_facturado), icon: <TrendingUp size={20} />, color: 'var(--success)', glow: 'rgba(16,185,129,0.2)' },
                  { label: 'Anomalías IA', value: reporte.anomalias_detectadas_ia, icon: <AlertTriangle size={20} />, color: 'var(--danger)', glow: 'rgba(239,68,68,0.2)' },
                ].map((card, i) => (
                  <div key={i} className="card-glass" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: card.glow, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, flexShrink: 0 }}>
                      {card.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{card.label}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white' }}>{card.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabla de Facturas del Reporte */}
              <div className="card-glass" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '1rem' }}>
                  Detalle de Facturas — {formatDate(reporte.fecha)}
                </h3>
                {reporte.facturas?.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                    No se registraron facturas en esta fecha.
                  </p>
                ) : (
                  <table className="table-premium">
                    <thead>
                      <tr>
                        <th>N° Factura</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>IA Anomalía</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reporte.facturas?.map((f: any) => (
                        <tr key={f.id_factura}>
                          <td style={{ fontFamily: 'monospace', color: 'var(--cyan)', fontWeight: 700 }}>{f.numero_factura}</td>
                          <td style={{ fontWeight: 600 }}>{f.cliente}</td>
                          <td><span className={`badge ${f.estado === 'Pagada' ? 'badge-success' : f.estado === 'Anulada' ? 'badge-danger' : 'badge-warning'}`}>{f.estado}</span></td>
                          <td style={{ fontWeight: 700 }}>{formatCurrency(f.total)}</td>
                          <td>{f.es_anomalia ? <span className="badge badge-danger">⚠ Anomalía</span> : <span className="badge badge-success">Normal</span>}</td>
                          <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{(f.score_anomalia * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ReportesPage
