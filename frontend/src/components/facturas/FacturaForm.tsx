import React, { useState, useEffect } from 'react'
import { clientesApi } from '../../api/clientes.api'
import { ClienteResponse } from '../../types/cliente.types'
import { FacturaCreate, DetalleFacturaCreate } from '../../types/factura.types'
import { Plus, Trash2, ShieldAlert } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'

interface FacturaFormProps {
  onSubmit: (data: FacturaCreate) => Promise<boolean>
  onClose: () => void
  userId: number
}

export const FacturaForm: React.FC<FacturaFormProps> = ({ onSubmit, onClose, userId }) => {
  const [numeroFactura, setNumeroFactura] = useState('')
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0])
  const [estado, setEstado] = useState('Emitida')
  const [idCliente, setIdCliente] = useState<number>(0)
  const [clientes, setClientes] = useState<ClienteResponse[]>([])
  const [detalles, setDetalles] = useState<DetalleFacturaCreate[]>([
    { cantidad: 1, precio_unitario: 100000 }
  ])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cargar clientes para el selector
  useEffect(() => {
    clientesApi.listar().then(setClientes).catch(() => {})
  }, [])

  const handleAddDetail = () => {
    setDetalles([...detalles, { cantidad: 1, precio_unitario: 0 }])
  }

  const handleRemoveDetail = (index: number) => {
    if (detalles.length === 1) return
    setDetalles(detalles.filter((_, i) => i !== index))
  }

  const handleDetailChange = (index: number, field: keyof DetalleFacturaCreate, value: number) => {
    setDetalles(
      detalles.map((det, i) => (i === index ? { ...det, [field]: value } : det))
    )
  }

  const totalCalculado = detalles.reduce(
    (sum, det) => sum + det.cantidad * det.precio_unitario,
    0
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!numeroFactura) {
      setErrorMsg('El número de factura es requerido.')
      return
    }
    if (idCliente === 0) {
      setErrorMsg('Debe seleccionar un cliente.')
      return
    }

    // Validar detalles
    for (const det of detalles) {
      if (det.cantidad <= 0 || det.precio_unitario <= 0) {
        setErrorMsg('La cantidad y precio unitario deben ser mayores a cero.')
        return
      }
    }

    setErrorMsg(null)
    setIsSubmitting(true)

    const payload: FacturaCreate = {
      numero_factura: numeroFactura,
      fecha,
      estado,
      id_cliente: idCliente,
      id_usuario: userId,
      detalles
    }

    const success = await onSubmit(payload)
    setIsSubmitting(false)
    if (success) {
      onClose()
    } else {
      setErrorMsg('No se pudo crear la factura. Es posible que el número ya exista o el motor de IA haya rechazado la petición.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {errorMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: 'var(--danger)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem'
        }}>
          <ShieldAlert size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Grid Principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Número de Factura
          </label>
          <input 
            type="text" 
            placeholder="FAC-0001" 
            className="input-premium"
            value={numeroFactura}
            onChange={(e) => setNumeroFactura(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Fecha de Emisión
          </label>
          <input 
            type="date" 
            className="input-premium"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Cliente
          </label>
          <select 
            className="input-premium"
            value={idCliente}
            onChange={(e) => setIdCliente(Number(e.target.value))}
            required
          >
            <option value={0}>Seleccione un cliente...</option>
            {clientes.map(c => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nombre} (NIT: {c.nit})</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Estado Inicial
          </label>
          <select 
            className="input-premium"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="Emitida">Emitida</option>
            <option value="Pagada">Pagada</option>
            <option value="Anulada">Anulada</option>
          </select>
        </div>
      </div>

      {/* Sección Dinámica de Detalles */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>Detalles de Facturación</h4>
          <button 
            type="button" 
            onClick={handleAddDetail}
            className="btn-premium btn-secondary-outline"
            style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem' }}
          >
            <Plus size={14} />
            Añadir Línea
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }}>
          {detalles.map((det, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ flex: 1 }}>
                <input 
                  type="number" 
                  min={1} 
                  placeholder="Cant." 
                  className="input-premium"
                  value={det.cantidad}
                  onChange={(e) => handleDetailChange(idx, 'cantidad', Number(e.target.value))}
                  required
                />
              </div>
              
              <div style={{ flex: 2 }}>
                <input 
                  type="number" 
                  min={0} 
                  placeholder="Precio Unitario (COP)" 
                  className="input-premium"
                  value={det.precio_unitario}
                  onChange={(e) => handleDetailChange(idx, 'precio_unitario', Number(e.target.value))}
                  required
                />
              </div>

              <div style={{ minWidth: '120px', textAlign: 'right', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {formatCurrency(det.cantidad * det.precio_unitario)}
              </div>

              <button 
                type="button" 
                onClick={() => handleRemoveDetail(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
                disabled={detalles.length === 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Suma Final y Guardar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '1.25rem',
        marginTop: '0.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Total Estimado</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan)' }}>{formatCurrency(totalCalculado)}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            type="button" 
            onClick={onClose}
            className="btn-premium btn-secondary-outline"
          >
            Cancelar
          </button>
          
          <button 
            type="submit" 
            className="btn-premium btn-primary-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Factura'}
          </button>
        </div>
      </div>
    </form>
  )
}
export default FacturaForm
