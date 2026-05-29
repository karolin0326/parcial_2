import { create } from 'zustand';

interface AlertaState {
  alertasPendientes: number;
  setAlertasPendientes: (n: number) => void;
}

export const useAlertaStore = create<AlertaState>((set) => ({
  alertasPendientes: 0,
  setAlertasPendientes: (n) => set({ alertasPendientes: n }),
}));
