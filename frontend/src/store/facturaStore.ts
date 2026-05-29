import { create } from 'zustand'
import { FacturaCreate, FacturaResponse } from '../types/factura.types'
import { facturasApi } from '../api/facturas.api'

interface FacturaState {
  facturas: FacturaResponse[]
  isLoading: boolean
  error: string | null
  fetchFacturas: () => Promise<void>
  crearFactura: (factura: FacturaCreate) => Promise<boolean>
  anularFactura: (id: number) => Promise<void>
}

export const useFacturaStore = create<FacturaState>((set, get) => ({
  facturas: [],
  isLoading: false,
  error: null,

  fetchFacturas: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await facturasApi.listar()
      set({ facturas: data, isLoading: false })
    } catch (err: any) {
      set({ error: err.message || 'Error al listar facturas', isLoading: false })
    }
  },

  crearFactura: async (factura: FacturaCreate): Promise<boolean> => {
    set({ isLoading: true, error: null })
    try {
      const nueva = await facturasApi.crear(factura)
      set({
        facturas: [nueva, ...get().facturas],
        isLoading: false
      })
      return true
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Error al registrar factura'
      set({ error: msg, isLoading: false })
      return false
    }
  },

  anularFactura: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const anulada = await facturasApi.anular(id)
      set({
        facturas: get().facturas.map(f => f.id_factura === id ? anulada : f),
        isLoading: false
      })
    } catch (err: any) {
      set({ error: err.message || 'Error al anular factura', isLoading: false })
    }
  }
}))
export default useFacturaStore
