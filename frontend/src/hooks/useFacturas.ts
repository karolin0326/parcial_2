import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosClient from '../api/axiosClient';
import { FacturaCreateDTO } from '../types/factura.types';

export const useGetFacturas = (filters?: any) => {
  return useQuery({
    queryKey: ['facturas', filters],
    queryFn: async () => {
      const { data } = await axiosClient.get('/facturas', { params: filters });
      return data;
    }
  });
};

export const useCreateFactura = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (factura: FacturaCreateDTO) => {
      const { data } = await axiosClient.post('/facturas', factura);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facturas'] });
      toast.success('Factura registrada correctamente');
    },
    onError: () => toast.error('Error al registrar la factura')
  });
};

export const useAnularFactura = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.post(`/facturas/${id}/anular`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facturas'] });
      toast.success('Factura anulada correctamente');
    },
    onError: () => toast.error('Error al anular la factura')
  });
};
