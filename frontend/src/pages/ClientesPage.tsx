import React, { useEffect, useState } from 'react'
import { clientesApi } from '../api/clientes.api'
import { ClienteResponse, ClienteCreate } from '../types/cliente.types'
import { Table } from '../components/common/Table'
import { Modal } from '../components/common/Modal'
import { ClienteForm } from '../components/clientes/ClienteForm'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { Plus, RefreshCw, Users, Pencil, Trash2 } from 'lucide-react'

const ClientesPage: React.FC = () => {
  const { usuario } = useAuth()
  const [clientes, setClientes] = useState<ClienteResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<ClienteResponse | null>(null)

  const canWrite = usuario?.rol === 'administrador' || usuario?.rol === 'contador'

  const loadClientes = () => {
    setLoading(true)
    clientesApi.listar().then(setClientes).finally(() => setLoading(false))
  }

  useEffect(() => { loadClientes() }, [])

  const handleSubmit = async (data: ClienteCreate): Promise<boolean> => {
    try {
      if (editTarget) {
        await clientesApi.actualizar(editTarget.id_cliente, data)
      } else {
        await clientesApi.crear(data)
      }
      loadClientes()
      return true
    } catch {
      return false
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este cliente? Esta acción no se puede deshacer.')) return
    await clientesApi.eliminar(id)
    loadClientes()
  }

  const openCreate = () => { setEditTarget(null); setShowModal(true) }
  const openEdit = (c: ClienteResponse) => { setEditTarget(c); setShowModal(true) }

  const columns = [
    { key: 'id', header: 'ID', render: (c: ClienteResponse) => <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>#{c.id_cliente}</span> },
    { key: 'nombre', header: 'Nombre / Razón Social', render: (c: ClienteResponse) => <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.nombre}</span> },
    { key: 'nit', header: 'NIT', render: (c: ClienteResponse) => <span style={{ fontFamily: 'monospace', color: 'var(--cyan)' }}>{c.nit}</span> },
    { key: 'telefono', header: 'Teléfono', render: (c: ClienteResponse) => c.telefono || <span style={{ color: 'var(--text-muted)' }}>—</span> },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (c: ClienteResponse) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {canWrite && (
            <>
              <button onClick={() => openEdit(c)} style={{ background: 'var(--info-bg)', border: 'none', color: 'var(--info)', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Pencil size={13} /> Editar
              </button>
              <button onClick={() => handleDelete(c.id_cliente)} style={{ background: 'var(--danger-bg)', border: 'none', color: 'var(--danger)', padding: '0.35rem 0.65rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                <Trash2 size={13} /> Eliminar
              </button>
            </>
          )}
        </div>
      )
    }
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <Users size={22} color="var(--cyan)" />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>Clientes</h1>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{clientes.length} cliente(s) registrados</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={loadClientes} className="btn-premium btn-secondary-outline" style={{ padding: '0.65rem 1rem' }}>
            <RefreshCw size={16} />
          </button>
          {canWrite && (
            <button id="btn-nuevo-cliente" onClick={openCreate} className="btn-premium btn-primary-glow">
              <Plus size={18} /> Nuevo Cliente
            </button>
          )}
        </div>
      </div>

      <div className="card-glass" style={{ padding: '1.5rem' }}>
        {loading ? <LoadingSpinner /> : <Table columns={columns} data={clientes} emptyMessage="No hay clientes registrados." />}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editTarget ? 'Editar Cliente' : 'Nuevo Cliente'}>
        <ClienteForm onSubmit={handleSubmit} onClose={() => setShowModal(false)} initial={editTarget} />
      </Modal>
    </div>
  )
}

export default ClientesPage
