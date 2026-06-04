import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/common/Sidebar'
import { Navbar } from '../components/common/Navbar'
import axiosClient from '../api/axiosClient'
import { Table } from '../components/common/Table'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { formatDateTime } from '../utils/formatters'
import { History, RefreshCw } from 'lucide-react'

interface AuditoriaRow {
  id_auditoria: number
  fecha: string
  accion: string
  usuario: string
  detalles?: string
}

const AuditoriaPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditoriaRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    axiosClient.get('/auditoria/?limit=200')
      .then(r => setLogs(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const columns = [
    { key: 'id', header: '#', render: (a: AuditoriaRow) => <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{a.id_auditoria}</span> },
    { key: 'fecha', header: 'Fecha y Hora', render: (a: AuditoriaRow) => <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{formatDateTime(a.fecha)}</span> },
    {
      key: 'accion',
      header: 'Acción',
      render: (a: AuditoriaRow) => (
        <span style={{
          display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: '6px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)',
          color: 'var(--primary)', fontSize: '0.82rem', fontWeight: 600
        }}>
          {a.accion}
        </span>
      )
    },
    { key: 'usuario', header: 'Usuario', render: (a: AuditoriaRow) => <span style={{ fontWeight: 600, color: 'var(--cyan)' }}>{a.usuario}</span> },
    {
      key: 'detalles',
      header: 'Detalles',
      render: (a: AuditoriaRow) => (
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '300px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {a.detalles || '—'}
        </span>
      )
    }
  ]

  return (
    <div className="flex bg-[var(--bg-main)] min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
        <Navbar title="Auditoría" />
        <main className="page-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <History size={22} color="var(--cyan)" />
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>Bitácora de Auditoría</h1>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Registro completo e inmutable de todas las acciones realizadas en el sistema
              </p>
            </div>
            <button onClick={load} className="btn-premium btn-secondary-outline" style={{ padding: '0.65rem 1rem' }}>
              <RefreshCw size={16} />
            </button>
          </div>

          <div className="card-glass" style={{ padding: '1.5rem' }}>
            {loading ? <LoadingSpinner /> : (
              <Table columns={columns} data={logs} emptyMessage="No hay registros de auditoría aún." />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuditoriaPage
