import React from 'react'
import { FacturaResponse } from '../../types/factura.types'
import { Table } from '../common/Table'
import { formatCurrency, formatDate, getInvoiceStatusClass } from '../../utils/formatters'
import { BanIcon, Trash2 } from 'lucide-react'

interface FacturaTableProps {
  facturas: FacturaResponse[]
  onAnular: (id: number) => void
  canDelete: boolean
}

export const FacturaTable: React.FC<FacturaTableProps> = ({ facturas, onAnular, canDelete }) => {
  const calcTotal = (f: FacturaResponse) =>
    f.detalles.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0)

  const columns = [
    {
      header: 'N° Factura',
      render: (f: FacturaResponse) => (
        <span style={{ fontWeight: 700, color: 'var(--cyan)', fontFamily: 'monospace' }}>
          {f.numero_factura}
        </span>
      )
    },
    { header: 'Fecha', render: (f: FacturaResponse) => formatDate(f.fecha) },
    {
      header: 'Estado',
      render: (f: FacturaResponse) => (
        <span className={`badge ${getInvoiceStatusClass(f.estado)}`}>{f.estado}</span>
      )
    },
    {
      header: 'Ítems',
      render: (f: FacturaResponse) => (
        <span style={{ color: 'var(--text-secondary)' }}>{f.detalles.length} línea(s)</span>
      )
    },
    {
      header: 'Total',
      render: (f: FacturaResponse) => (
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          {formatCurrency(calcTotal(f))}
        </span>
      )
    },
    {
      header: 'Acciones',
      render: (f: FacturaResponse) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {f.estado !== 'Anulada' && (
            <button
              onClick={() => onAnular(f.id_factura)}
              title="Anular Factura"
              style={{
                background: 'var(--warning-bg)',
                border: '1px solid var(--warning-border)',
                color: 'var(--warning)',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <BanIcon size={14} /> Anular
            </button>
          )}
        </div>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      data={facturas}
      emptyMessage="No hay facturas registradas. Crea la primera usando el botón de arriba."
    />
  )
}
export default FacturaTable
