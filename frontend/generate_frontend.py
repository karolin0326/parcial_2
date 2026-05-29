import os

base_path = r"c:\Users\user\Desktop\ingenieria de sofware 2\sistema-facturacion-ia\frontend\src"

files = {
    "types/factura.types.ts": """export type FacturaEstado = 'pendiente' | 'validada' | 'anomalia' | 'anulada';

export interface DetalleFactura {
  id_detalle: number;
  cantidad: number;
  precio_unitario: number;
  id_factura: number;
}

export interface Factura {
  id_factura: number;
  numero_factura: string;
  fecha: string;
  estado: FacturaEstado;
  id_cliente: number;
  id_usuario: number;
  detalles: DetalleFactura[];
}

export type FacturaCreateDTO = Omit<Factura, 'id_factura' | 'estado' | 'id_usuario' | 'detalles'> & {
  detalles: Omit<DetalleFactura, 'id_detalle' | 'id_factura'>[];
};
""",
    "types/cliente.types.ts": """export interface Cliente {
  id_cliente: number;
  nombre: string;
  nit: string;
  telefono: string;
}
export type ClienteCreateDTO = Omit<Cliente, 'id_cliente'>;
""",
    "types/alerta.types.ts": """export type AlertaEstado = 'pendiente' | 'revisada' | 'resuelta';

export interface Alerta {
  id_alerta: number;
  descripcion: string;
  id_tipo: number;
  id_estado: AlertaEstado;
  factura_id: number;
  fecha_generada: string;
}
""",
    "types/usuario.types.ts": """export type Rol = 'contador' | 'auditor' | 'administrador';

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  rol: Rol;
  id_estado: number;
}

export interface LoginDTO {
  correo: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}
""",
    "types/dashboard.types.ts": """export interface KPIData {
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
""",
    "api/axiosClient.ts": """import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
});

axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
""",
    "store/authStore.ts": """import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario } from '../types/usuario.types';

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,
      setAuth: (usuario, token) => set({ usuario, token, isAuthenticated: true }),
      logout: () => set({ usuario: null, token: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' }
  )
);
""",
    "store/alertaStore.ts": """import { create } from 'zustand';

interface AlertaState {
  alertasPendientes: number;
  setAlertasPendientes: (n: number) => void;
}

export const useAlertaStore = create<AlertaState>((set) => ({
  alertasPendientes: 0,
  setAlertasPendientes: (n) => set({ alertasPendientes: n }),
}));
""",
}

for rel_path, content in files.items():
    full_path = os.path.join(base_path, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Files generated successfully.")
