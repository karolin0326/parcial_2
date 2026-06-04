import { useQuery } from '@tanstack/react-query';
import axiosClient from '../api/axiosClient';

export interface DashboardMetrics {
  kpis: {
    total_facturas_emitidas: number;
    total_clientes_activos: number;
    total_alertas_generadas_ia: number;
    valor_total_facturado: number;
  };
  anomalies_trend: {
    name: string;
    normal: number;
    anomalias: number;
  }[];
}

export const useDashboard = () => {
  return useQuery<DashboardMetrics>({
    queryKey: ['dashboard_metrics'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/dashboard/metrics');
      return data;
    },
  });
};
