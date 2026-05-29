export type AlertaEstado = 'pendiente' | 'revisada' | 'resuelta';

export interface Alerta {
  id_alerta: number;
  descripcion: string;
  id_tipo: number;
  id_estado: AlertaEstado;
  factura_id: number;
  fecha_generada: string;
}
