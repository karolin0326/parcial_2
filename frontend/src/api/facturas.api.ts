import axiosClient from './axiosClient';
import { FacturaCreateDTO } from '../types/factura.types';

export const getFacturas = async (params?: any) => {
  const { data } = await axiosClient.get('/facturas', { params });
  return data;
};

export const getFacturaById = async (id: number) => {
  const { data } = await axiosClient.get(`/facturas/${id}`);
  return data;
};

export const createFactura = async (factura: FacturaCreateDTO) => {
  const { data } = await axiosClient.post('/facturas', factura);
  return data;
};

export const anularFactura = async (id: number) => {
  const { data } = await axiosClient.post(`/facturas/${id}/anular`);
  return data;
};
