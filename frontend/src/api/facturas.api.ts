import axiosClient from './axiosClient';
import { FacturaCreateDTO, FacturaResponse } from '../types/factura.types';

export const facturasApi = {
  listar: async (params?: any): Promise<FacturaResponse[]> => {
    const { data } = await axiosClient.get('/facturas', { params });
    return data;
  },
  obtener: async (id: number): Promise<FacturaResponse> => {
    const { data } = await axiosClient.get(`/facturas/${id}`);
    return data;
  },
  crear: async (factura: FacturaCreateDTO): Promise<FacturaResponse> => {
    const { data } = await axiosClient.post('/facturas', factura);
    return data;
  },
  anular: async (id: number): Promise<FacturaResponse> => {
    const { data } = await axiosClient.post(`/facturas/${id}/anular`);
    return data;
  }
};
