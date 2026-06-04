import React, { useState } from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Navbar } from '../components/common/Navbar';
import { Table } from '../components/common/Table';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Plus, Eye, Ban, FileText, RefreshCw, Calendar, DollarSign, AlertTriangle, CheckCircle, ShieldAlert, X } from 'lucide-react';
import { useGetFacturas, useCreateFactura, useAnularFactura } from '../hooks/useFacturas';
import { clientesApi } from '../api/clientes.api';
import { useAuth } from '../hooks/useAuth';
import { Factura, FacturaCreateDTO, DetalleFacturaCreate } from '../types/factura.types';
import { ClienteResponse } from '../types/cliente.types';
import { format } from 'date-fns';

const estadoBadge = (estado: string) => {
  const map: Record<string, { label: string; cls: string }> = {
    Emitida:  { label: 'Emitida',  cls: 'badge badge-info' },
    Pagada:   { label: 'Pagada',   cls: 'badge badge-success' },
    Anulada:  { label: 'Anulada',  cls: 'badge badge-danger' },
    pendiente:{ label: 'Pendiente',cls: 'badge badge-warning' },
    anomalia: { label: 'Anomalía', cls: 'badge badge-danger' },
  };
  const b = map[estado] ?? { label: estado, cls: 'badge badge-neutral' };
  return <span className={b.cls}>{b.label}</span>;
};

const formatMoney = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

// ── Formulario de nueva factura ────────────────────────────────────────────
const FacturaForm: React.FC<{ onClose: () => void; usuarioId: number }> = ({ onClose, usuarioId }) => {
  const createFactura = useCreateFactura();
  const [clientes, setClientes] = React.useState<ClienteResponse[]>([]);
  const [loadingClientes, setLoadingClientes] = React.useState(true);

  const [numero, setNumero] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [idCliente, setIdCliente] = useState('');
  const [detalles, setDetalles] = useState<DetalleFacturaCreate[]>([
    { cantidad: 1, precio_unitario: 0 }
  ]);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    clientesApi.listar().then(setClientes).finally(() => setLoadingClientes(false));
  }, []);

  const addDetalle = () => setDetalles([...detalles, { cantidad: 1, precio_unitario: 0 }]);
  const removeDetalle = (i: number) => setDetalles(detalles.filter((_, idx) => idx !== i));
  const updateDetalle = (i: number, field: keyof DetalleFacturaCreate, value: number) => {
    setDetalles(detalles.map((d, idx) => idx === i ? { ...d, [field]: value } : d));
  };

  const total = detalles.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numero || !idCliente) { setError('El número de factura y el cliente son obligatorios.'); return; }
    if (detalles.length === 0) { setError('Debe agregar al menos un detalle.'); return; }

    setError(null);
    const payload: FacturaCreateDTO = {
      numero_factura: numero,
      fecha,
      estado: 'Emitida',
      id_cliente: Number(idCliente),
      id_usuario: usuarioId,
      detalles,
    };

    try {
      await createFactura.mutateAsync(payload);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'No se pudo registrar la factura.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          <ShieldAlert size={18} /><span>{error}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="login-form-label">N° de Factura</label>
          <input type="text" className="input-premium" placeholder="FAC-001" value={numero} onChange={e => setNumero(e.target.value)} required />
        </div>
        <div>
          <label className="login-form-label">Fecha</label>
          <input type="date" className="input-premium" value={fecha} onChange={e => setFecha(e.target.value)} required />
        </div>
      </div>

      <div>
        <label className="login-form-label">Cliente</label>
        {loadingClientes ? <LoadingSpinner /> : (
          <select className="input-premium" value={idCliente} onChange={e => setIdCliente(e.target.value)} required>
            <option value="">— Seleccione un cliente —</option>
            {clientes.map(c => (
              <option key={c.id_cliente} value={c.id_cliente}>{c.nombre} ({c.nit})</option>
            ))}
          </select>
        )}
      </div>

      {/* Detalles */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <label className="login-form-label" style={{ margin: 0 }}>Líneas de Detalle</label>
          <button type="button" onClick={addDetalle} className="btn-premium btn-secondary-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}>
            <Plus size={13} /> Agregar línea
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {detalles.map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
              <div>
                <input
                  type="number"
                  className="input-premium"
                  placeholder="Cantidad"
                  min={0.01}
                  step="0.01"
                  value={d.cantidad}
                  onChange={e => updateDetalle(i, 'cantidad', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <div>
                <input
                  type="number"
                  className="input-premium"
                  placeholder="Precio unitario"
                  min={0}
                  step="0.01"
                  value={d.precio_unitario}
                  onChange={e => updateDetalle(i, 'precio_unitario', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
              <button type="button" onClick={() => removeDetalle(i)} style={{ background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', color: 'var(--danger)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '0.75rem', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Total estimado: <span style={{ color: 'var(--success)', fontWeight: 700 }}>{formatMoney(total)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
        <button type="button" onClick={onClose} className="btn-premium btn-secondary-outline">Cancelar</button>
        <button type="submit" className="btn-premium btn-primary-glow" disabled={createFactura.isPending}>
          {createFactura.isPending ? 'Registrando...' : 'Registrar Factura'}
        </button>
      </div>
    </form>
  );
};

// ── Modal de detalle de factura ────────────────────────────────────────────
const FacturaDetalle: React.FC<{ factura: Factura }> = ({ factura }) => {
  const totalFactura = factura.detalles?.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0) ?? 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="card-glass" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>N° Factura</div>
          <div style={{ fontFamily: 'monospace', color: 'var(--cyan)', fontWeight: 700, fontSize: '1rem' }}>{factura.numero_factura}</div>
        </div>
        <div className="card-glass" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Estado</div>
          <div>{estadoBadge(factura.estado)}</div>
        </div>
        <div className="card-glass" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Fecha</div>
          <div style={{ fontWeight: 600 }}>{format(new Date(factura.fecha), 'dd/MM/yyyy')}</div>
        </div>
        <div className="card-glass" style={{ padding: '1rem' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>Total</div>
          <div style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.1rem' }}>{formatMoney(totalFactura)}</div>
        </div>
      </div>
      <div className="card-glass" style={{ padding: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>Líneas de Detalle</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {factura.detalles?.map((d, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{d.cantidad}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{formatMoney(d.precio_unitario)}</td>
                <td style={{ fontWeight: 700, color: 'var(--success)' }}>{formatMoney(d.cantidad * d.precio_unitario)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Página principal ───────────────────────────────────────────────────────
export const FacturasPage = () => {
  const { usuario } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detalle, setDetalle] = useState<Factura | null>(null);
  const { data: facturas, isLoading, refetch } = useGetFacturas();
  const anularMutation = useAnularFactura();

  const canWrite = usuario?.rol === 'administrador' || usuario?.rol === 'contador';

  const handleAnular = (id: number) => {
    if (window.confirm('¿Está seguro de anular esta factura? No se puede deshacer.')) {
      anularMutation.mutate(id);
    }
  };

  // KPIs calculados
  const total = facturas?.length ?? 0;
  const emitidas = facturas?.filter((f: Factura) => f.estado === 'Emitida').length ?? 0;
  const anuladas = facturas?.filter((f: Factura) => f.estado === 'Anulada').length ?? 0;
  const montoTotal = facturas?.reduce((s: number, f: Factura) =>
    s + (f.detalles?.reduce((sd, d) => sd + d.cantidad * d.precio_unitario, 0) ?? 0), 0) ?? 0;

  const columns = [
    {
      key: 'numero_factura', header: 'N° Factura',
      render: (row: Factura) => <span style={{ fontFamily: 'monospace', color: 'var(--cyan)', fontWeight: 700 }}>{row.numero_factura}</span>
    },
    {
      key: 'fecha', header: 'Fecha',
      render: (row: Factura) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
          <Calendar size={14} />{format(new Date(row.fecha), 'dd/MM/yyyy')}
        </span>
      )
    },
    {
      key: 'total', header: 'Total',
      render: (row: Factura) => {
        const t = row.detalles?.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0) ?? 0;
        return <span style={{ fontWeight: 700, color: 'var(--success)' }}>{formatMoney(t)}</span>;
      }
    },
    {
      key: 'estado', header: 'Estado',
      render: (row: Factura) => estadoBadge(row.estado)
    },
    {
      key: 'acciones', header: 'Acciones',
      render: (row: Factura) => (
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setDetalle(row)}
            className="btn-premium btn-secondary-outline"
            style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem', gap: '4px' }}
            title="Ver detalle"
          >
            <Eye size={13} /> Ver
          </button>
          {canWrite && row.estado !== 'Anulada' && (
            <button
              onClick={() => handleAnular(row.id_factura)}
              className="btn-premium btn-danger"
              style={{ padding: '0.3rem 0.65rem', fontSize: '0.8rem', gap: '4px' }}
              title="Anular factura"
            >
              <Ban size={13} /> Anular
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Gestión de Facturas" />
        <main className="page-content">
          {/* Header */}
          <div className="page-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                <FileText size={22} color="var(--cyan)" />
                <h1 className="page-title">Facturas</h1>
              </div>
              <p className="page-subtitle">Registro, consulta y anulación de facturas · Con detección de anomalías IA</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => refetch()} className="btn-premium btn-secondary-outline" style={{ padding: '0.65rem 1rem' }}>
                <RefreshCw size={16} />
              </button>
              {canWrite && (
                <button id="btn-nueva-factura" onClick={() => setIsModalOpen(true)} className="btn-premium btn-primary-glow">
                  <Plus size={18} /> Nueva Factura
                </button>
              )}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="kpi-card c-primary">
              <div className="kpi-icon c-primary"><FileText size={22} /></div>
              <div>
                <div className="kpi-label">Total Facturas</div>
                <div className="kpi-value">{total}</div>
              </div>
            </div>
            <div className="kpi-card c-success">
              <div className="kpi-icon c-success"><DollarSign size={22} /></div>
              <div>
                <div className="kpi-label">Monto Total</div>
                <div className="kpi-value" style={{ fontSize: '1.4rem' }}>{formatMoney(montoTotal)}</div>
              </div>
            </div>
            <div className="kpi-card c-warning">
              <div className="kpi-icon c-warning"><CheckCircle size={22} /></div>
              <div>
                <div className="kpi-label">Emitidas</div>
                <div className="kpi-value">{emitidas}</div>
              </div>
            </div>
            <div className="kpi-card c-danger">
              <div className="kpi-icon c-danger"><AlertTriangle size={22} /></div>
              <div>
                <div className="kpi-label">Anuladas</div>
                <div className="kpi-value">{anuladas}</div>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="card-glass" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <div className="card-header" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className="card-title">Listado de Facturas</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{total} registro(s)</span>
            </div>
            {isLoading
              ? <LoadingSpinner />
              : <Table columns={columns} data={facturas || []} emptyMessage="No se encontraron facturas registradas." />
            }
          </div>
        </main>
      </div>

      {/* Modal nueva factura */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nueva Factura" size="md">
        {usuario && <FacturaForm onClose={() => setIsModalOpen(false)} usuarioId={usuario.id_usuario ?? 0} />}
      </Modal>

      {/* Modal detalle factura */}
      <Modal isOpen={!!detalle} onClose={() => setDetalle(null)} title={`Detalle — ${detalle?.numero_factura}`} size="md">
        {detalle && <FacturaDetalle factura={detalle} />}
      </Modal>
    </div>
  );
};
