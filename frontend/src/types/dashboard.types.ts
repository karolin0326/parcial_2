export interface KPIData {
  total_facturas: number;
  facturas_anomalia: number;
  tasa_anomalia: number;
  alertas_pendientes: number;
  precision_modelo: number;
}

export interface AnomaliaPoint {
  fecha: string;
  cantidad: number;
  tipo: string;
}
