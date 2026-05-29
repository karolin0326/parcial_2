import { create } from 'zustand';
import { AlertaResponse, AlertaUpdate } from '../types/alerta.types';
import alertasApi from '../api/alertas.api';

interface AlertaState {
  alertas: AlertaResponse[];
  alertasPendientes: number;
  isLoading: boolean;
  error: string | null;
  fetchAlertas: () => Promise<void>;
  resolverAlerta: (id: number, update: AlertaUpdate) => Promise<void>;
  setAlertasPendientes: (n: number) => void;
}

export const useAlertaStore = create<AlertaState>((set, get) => ({
  alertas: [],
  alertasPendientes: 0,
  isLoading: false,
  error: null,
  setAlertasPendientes: (n) => set({ alertasPendientes: n }),
  fetchAlertas: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await alertasApi.listar();
      set({ 
        alertas: data, 
        alertasPendientes: data.filter(a => a.id_estado !== 3).length,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message || 'Error al cargar alertas', isLoading: false });
    }
  },
  resolverAlerta: async (id: number, update: AlertaUpdate) => {
    try {
      const updated = await alertasApi.actualizar(id, update);
      const newAlertas = get().alertas.map(a => a.id_alerta === id ? updated : a);
      set({
        alertas: newAlertas,
        alertasPendientes: newAlertas.filter(a => a.id_estado !== 3).length
      });
    } catch (err: any) {
      set({ error: err.message || 'Error al resolver alerta' });
    }
  }
}));

