export type AlertaEstado = 'pendiente' | 'revisada' | 'resuelta';

export interface Alerta {
  id_alerta: number;
  descripcion: string;
  id_tipo: number;
  id_estado: number;
  id_factura: number;
  fecha_creacion: string;
}

export interface AlertaResponse extends Alerta {}
export interface AlertaUpdate {
  id_estado: number;
}
