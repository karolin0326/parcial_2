import React, { useState, useEffect } from 'react'
import { ClienteCreate, ClienteResponse } from '../../types/cliente.types'
import { ShieldAlert } from 'lucide-react'

interface ClienteFormProps {
  onSubmit: (data: ClienteCreate) => Promise<boolean>
  onClose: () => void
  initial?: ClienteResponse | null
}

export const ClienteForm: React.FC<ClienteFormProps> = ({ onSubmit, onClose, initial }) => {
  const [nombre, setNombre] = useState(initial?.nombre || '')
  const [nit, setNit] = useState(initial?.nit || '')
  const [telefono, setTelefono] = useState(initial?.telefono || '')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initial) {
      setNombre(initial.nombre)
      setNit(initial.nit)
      setTelefono(initial.telefono || '')
    }
  }, [initial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombre.trim() || !nit.trim()) {
      setError('El nombre y el NIT son obligatorios.')
      return
    }
    setError(null)
    setIsSubmitting(true)
    const ok = await onSubmit({ nombre, nit, telefono: telefono || undefined })
    setIsSubmitting(false)
    if (ok) onClose()
    else setError('No se pudo guardar el cliente. El NIT puede estar duplicado.')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          background: 'var(--danger-bg)', border: '1px solid var(--danger-border)',
          color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem'
        }}>
          <ShieldAlert size={18} /><span>{error}</span>
        </div>
      )}

      <div>
        <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
          Nombre / Razón Social
        </label>
        <input type="text" placeholder="Empresa S.A.S." className="input-premium"
          value={nombre} onChange={e => setNombre(e.target.value)} required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            NIT
          </label>
          <input type="text" placeholder="900.123.456-1" className="input-premium"
            value={nit} onChange={e => setNit(e.target.value)} required />
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Teléfono (opcional)
          </label>
          <input type="tel" placeholder="3001234567" className="input-premium"
            value={telefono} onChange={e => setTelefono(e.target.value)} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="button" onClick={onClose} className="btn-premium btn-secondary-outline">Cancelar</button>
        <button type="submit" className="btn-premium btn-primary-glow" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : initial ? 'Actualizar Cliente' : 'Registrar Cliente'}
        </button>
      </div>
    </form>
  )
}
export default ClienteForm
