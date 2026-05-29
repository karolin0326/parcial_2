export type FacturaEstado = 'pendiente' | 'validada' | 'anomalia' | 'anulada';

export interface DetalleFactura {
  id_detalle: number;
  cantidad: number;
  precio_unitario: number;
  id_factura: number;
}

export interface Factura {
  id_factura: number;
  numero_factura: string;
  fecha: string;
  estado: FacturaEstado;
  id_cliente: number;
  id_usuario: number;
  detalles: DetalleFactura[];
}

export type FacturaCreateDTO = Omit<Factura, 'id_factura' | 'estado' | 'id_usuario' | 'detalles'> & {
  detalles: Omit<DetalleFactura, 'id_detalle' | 'id_factura'>[];
};
