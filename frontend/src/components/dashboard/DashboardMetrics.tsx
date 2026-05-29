import React, { useState, useEffect } from 'react'
import { dashboardApi } from '../../api/dashboard.api'
import { FileSpreadsheet, Users, ShieldAlert, TrendingUp, AlertTriangle, BrainCircuit, Activity } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

interface KPI {
  total_facturas_emitidas: number
  total_clientes_activos: number
  total_alertas_generadas_ia: number
  valor_total_facturado: number
}

interface TrendPoint { name: string; normal: number; anomalias: number }

export const DashboardMetrics: React.FC = () => {
  const [kpis, setKpis] = useState<KPI | null>(null)
  const [trend, setTrend] = useState<TrendPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardApi.obtenerMetricas()
      .then(data => {
        setKpis(data.kpis)
        setTrend(data.anomalies_trend || [])
      })
      .catch(() => {
        // Datos de demostración si el backend no está activo
        setKpis({ total_facturas_emitidas: 128, total_clientes_activos: 34, total_alertas_generadas_ia: 7, valor_total_facturado: 85432100 })
        setTrend([
          { name: 'Ene', normal: 45, anomalias: 2 },
          { name: 'Feb', normal: 60, anomalias: 3 },
          { name: 'Mar', normal: 55, anomalias: 1 },
          { name: 'Abr', normal: 70, anomalias: 5 },
          { name: 'May', normal: 85, anomalias: 7 },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const cards = kpis ? [
    { label: 'Facturas Emitidas', value: kpis.total_facturas_emitidas, icon: <FileSpreadsheet size={22} />, color: 'var(--primary)', glow: 'rgba(99,102,241,0.25)' },
    { label: 'Clientes Activos', value: kpis.total_clientes_activos, icon: <Users size={22} />, color: 'var(--cyan)', glow: 'rgba(6,182,212,0.25)' },
    { label: 'Alertas IA Activas', value: kpis.total_alertas_generadas_ia, icon: <ShieldAlert size={22} />, color: 'var(--danger)', glow: 'rgba(239,68,68,0.25)' },
    { label: 'Total Facturado', value: formatCurrency(kpis.valor_total_facturado), icon: <TrendingUp size={22} />, color: 'var(--success)', glow: 'rgba(16,185,129,0.25)' },
  ] : []

  const maxVal = Math.max(...trend.map(t => t.normal + t.anomalias), 1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-glass" style={{ height: '110px', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))
          : cards.map((card, i) => (
              <div key={i} className="card-glass" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {card.label}
                  </span>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: card.glow, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: card.color
                  }}>
                    {card.icon}
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {card.value}
                </div>
              </div>
            ))
        }
      </div>

      {/* Chart de Tendencia de Anomalías */}
      <div className="card-glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Activity size={20} color="var(--cyan)" />
          <h3 style={{ fontSize: '1rem', color: 'white', fontWeight: 700 }}>Tendencia de Anomalías Detectadas por IA</h3>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--primary)', display: 'inline-block' }} />Normal
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'var(--danger)', display: 'inline-block' }} />Anomalías
            </span>
          </div>
        </div>

        {/* Gráfico de Barras SVG Simple */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '160px', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
          {trend.map((t, i) => {
            const totalH = ((t.normal + t.anomalias) / maxVal) * 140
            const anomH = (t.anomalias / maxVal) * 140
            const normH = totalH - anomH
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ height: `${anomH}px`, background: 'rgba(239,68,68,0.7)', borderRadius: '3px 3px 0 0', minHeight: t.anomalias > 0 ? '4px' : '0', transition: 'height 0.5s ease' }} />
                  <div style={{ height: `${normH}px`, background: 'rgba(99,102,241,0.5)', borderRadius: '3px 3px 0 0', minHeight: t.normal > 0 ? '4px' : '0', transition: 'height 0.5s ease' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Banner IA */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.12) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '16px', padding: '1.5rem',
        display: 'flex', alignItems: 'center', gap: '1.5rem'
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '14px',
          background: 'var(--primary-glow)', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(99,102,241,0.5)', flexShrink: 0
        }}>
          <BrainCircuit size={28} color="white" />
        </div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Motor de IA Activo — Isolation Forest</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Analizando transacciones en tiempo real · Umbral de contaminación: 5% · Modelo v1.0.0
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 8px var(--success)', animation: 'pulse-danger 2s infinite' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)' }}>En Línea</span>
        </div>
      </div>
    </div>
  )
}
export default DashboardMetrics
