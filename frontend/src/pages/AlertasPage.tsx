import React from 'react'
import { useAlertas } from '../hooks/useAlertas'
import { Table } from '../components/common/Table'
import { AlertBadge } from '../components/common/AlertBadge'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { AlertaResponse } from '../types/alerta.types'
import { formatDateTime } from '../utils/formatters'
import { ShieldAlert, RefreshCw, CheckCircle } from 'lucide-react'

const AlertasPage: React.FC = () => {
  const { alertas, isLoading, error, fetchAlertas, resolverAlerta } = useAlertas(true)

  const handleResolver = (id: number) => {
    resolverAlerta(id, { id_estado: 3 }) // 3 = Resuelta
  }

  const columns = [
    {
      header: 'ID',
      render: (a: AlertaResponse) => <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>#{a.id_alerta}</span>
    },
    {
      header: 'Descripción',
      render: (a: AlertaResponse) => (
        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', maxWidth: '340px', display: 'block' }}>
          {a.descripcion}
        </span>
      )
    },
    {
      header: 'Factura',
      render: (a: AlertaResponse) => a.id_factura
        ? <span style={{ fontFamily: 'monospace', color: 'var(--cyan)' }}>#{a.id_factura}</span>
        : <span style={{ color: 'var(--text-muted)' }}>—</span>
    },
    { header: 'Fecha', render: (a: AlertaResponse) => formatDateTime(a.fecha_creacion) },
    {
      header: 'Estado',
      render: (a: AlertaResponse) => <AlertBadge status={a.id_estado} />
    },
    {
      header: 'Acción',
      render: (a: AlertaResponse) => (
        a.id_estado !== 3 ? (
          <button
            onClick={() => handleResolver(a.id_alerta)}
            style={{
              background: 'var(--success-bg)', border: '1px solid var(--success-border)',
              color: 'var(--success)', padding: '0.35rem 0.75rem', borderRadius: '6px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '0.8rem', fontWeight: 600
            }}
          >
            <CheckCircle size={13} /> Resolver
          </button>
        ) : (
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Resuelta</span>
        )
      )
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <ShieldAlert size={22} color="var(--danger)" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
              Alertas de IA
            </h1>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Anomalías detectadas automáticamente por el motor Isolation Forest
          </p>
        </div>
        <button onClick={fetchAlertas} className="btn-premium btn-secondary-outline" style={{ padding: '0.65rem 1rem' }}>
          <RefreshCw size={16} />
        </button>
      </div>

      {error && (
        <div style={{
          background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
          color: 'var(--danger)', padding: '0.9rem 1.25rem',
          borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.9rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      <div className="card-glass" style={{ padding: '1.5rem' }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Table
            columns={columns}
            data={alertas}
            emptyMessage="No hay alertas activas. El sistema está operando con normalidad. ✅"
          />
        )}
      </div>
    </div>
  )
}

export default AlertasPage
