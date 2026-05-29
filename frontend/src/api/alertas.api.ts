import axiosClient from './axiosClient'
import { AlertaResponse, AlertaUpdate } from '../types/alerta.types'

export const alertasApi = {
  listar: async (skip = 0, limit = 100): Promise<AlertaResponse[]> => {
    const res = await axiosClient.get(`/alertas/?skip=${skip}&limit=${limit}`)
    return res.data
  },
  
  obtener: async (id: number): Promise<AlertaResponse> => {
    const res = await axiosClient.get(`/alertas/${id}`)
    return res.data
  },
  
  actualizar: async (id: number, update: AlertaUpdate): Promise<AlertaResponse> => {
    const res = await axiosClient.put(`/alertas/${id}`, update)
    return res.data
  }
}
export default alertasApi
