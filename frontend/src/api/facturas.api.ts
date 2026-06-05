import axiosClient from './axiosClient';
import { FacturaCreateDTO, FacturaResponse } from '../types/factura.types';

export const facturasApi = {
  // CU-03 | RF-01 | E12 - listarFacturas()
  listar: async (params?: any): Promise<FacturaResponse[]> => {
    const { data } = await axiosClient.get('/facturas', { params });
    return data;
  },
  // CU-03 | RF-01 | E12 - obtenerFactura()
  obtener: async (id: number): Promise<FacturaResponse> => {
    const { data } = await axiosClient.get(`/facturas/${id}`);
    return data;
  },
  // CU-03 | RF-01 | E12 - crearFactura()
  crear: async (factura: FacturaCreateDTO): Promise<FacturaResponse> => {
    const { data } = await axiosClient.post('/facturas', factura);
    return data;
  },
  // CU-03 | RF-01 | E12 - anularFactura()
  anular: async (id: number): Promise<FacturaResponse> => {
    const { data } = await axiosClient.post(`/facturas/${id}/anular`);
    return data;
  }
};
