import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/common/Sidebar'
import { Navbar } from '../components/common/Navbar'
import { usuariosApi } from '../api/usuarios.api'
import { UsuarioResponse, UsuarioCreate } from '../types/usuario.types'
import { Table } from '../components/common/Table'
import { Modal } from '../components/common/Modal'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { UserCog, Plus, RefreshCw, ShieldAlert, Eye, EyeOff } from 'lucide-react'

const rolColors: Record<string, string> = {
  Administrador: 'var(--danger)',
  Contador: 'var(--primary)',
  Auditor: 'var(--cyan)'
}

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  // Form state
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [rol, setRol] = useState('Contador')
  const [showPass, setShowPass] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const load = () => {
    setLoading(true)
    usuariosApi.listar().then(setUsuarios).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre || !correo || !contrasenia) { setFormError('Todos los campos son obligatorios.'); return }
    setSubmitting(true); setFormError(null)
    try {
      await usuariosApi.crear({ nombre, correo, contrasenia, rol, id_estado: 1 })
      load(); setShowModal(false)
      setNombre(''); setCorreo(''); setContrasenia('')
    } catch (e: any) {
      setFormError(e.response?.data?.detail || 'Error al crear el usuario.')
    } finally { setSubmitting(false) }
  }

  const columns = [
    { key: 'id', header: 'ID', render: (u: UsuarioResponse) => <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>#{u.id_usuario}</span> },
    { key: 'nombre', header: 'Nombre', render: (u: UsuarioResponse) => <span style={{ fontWeight: 600 }}>{u.nombre}</span> },
    { key: 'correo', header: 'Correo', render: (u: UsuarioResponse) => <span style={{ color: 'var(--text-secondary)' }}>{u.correo}</span> },
    {
      key: 'rol',
      header: 'Rol',
      render: (u: UsuarioResponse) => (
        <span className="badge" style={{ background: `${rolColors[u.rol]}22`, border: `1px solid ${rolColors[u.rol]}55`, color: rolColors[u.rol] }}>
          {u.rol}
        </span>
      )
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (u: UsuarioResponse) => u.id_estado === 1
        ? <span className="badge badge-success">Activo</span>
        : <span className="badge badge-danger">Inactivo</span>
    }
  ]

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Gestión de Usuarios" />
        <main className="page-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <UserCog size={22} color="var(--cyan)" />
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>Gestión de Usuarios</h1>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{usuarios.length} usuario(s) registrados</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={load} className="btn-premium btn-secondary-outline" style={{ padding: '0.65rem 1rem' }}><RefreshCw size={16} /></button>
              <button id="btn-nuevo-usuario" onClick={() => setShowModal(true)} className="btn-premium btn-primary-glow"><Plus size={18} /> Nuevo Usuario</button>
            </div>
          </div>

          <div className="card-glass" style={{ padding: '1.5rem' }}>
            {loading ? <LoadingSpinner /> : <Table columns={columns} data={usuarios} emptyMessage="No hay usuarios registrados." />}
          </div>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Crear Nuevo Usuario">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {formError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.88rem' }}>
                  <ShieldAlert size={16} /><span>{formError}</span>
                </div>
              )}
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Nombre Completo</label>
                <input type="text" className="input-premium" placeholder="Juan Pérez" value={nombre} onChange={e => setNombre(e.target.value)} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Correo</label>
                  <input type="email" className="input-premium" placeholder="juan@empresa.com" value={correo} onChange={e => setCorreo(e.target.value)} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Rol del Sistema</label>
                  <select className="input-premium" value={rol} onChange={e => setRol(e.target.value)}>
                    <option>Contador</option>
                    <option>Auditor</option>
                    <option>Administrador</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Contraseña Inicial</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} className="input-premium" placeholder="mínimo 6 caracteres" value={contrasenia} onChange={e => setContrasenia(e.target.value)} required style={{ paddingRight: '2.75rem' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-premium btn-secondary-outline">Cancelar</button>
                <button type="submit" className="btn-premium btn-primary-glow" disabled={submitting}>{submitting ? 'Creando...' : 'Crear Usuario'}</button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  )
}

export default UsuariosPage
