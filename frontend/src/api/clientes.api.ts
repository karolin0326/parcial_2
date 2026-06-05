import axiosClient from './axiosClient'
import { ClienteCreate, ClienteResponse } from '../types/cliente.types'

export const clientesApi = {
  // CU-02 | RF-10 | E12 - listarClientes()
  listar: async (skip = 0, limit = 100): Promise<ClienteResponse[]> => {
    const res = await axiosClient.get(`/clientes/?skip=${skip}&limit=${limit}`)
    return res.data
  },
  
  // CU-02 | RF-10 | E12 - obtenerCliente()
  obtener: async (id: number): Promise<ClienteResponse> => {
    const res = await axiosClient.get(`/clientes/${id}`)
    return res.data
  },
  
  // CU-02 | RF-10 | E12 - crearCliente()
  crear: async (cliente: ClienteCreate): Promise<ClienteResponse> => {
    const res = await axiosClient.post('/clientes/', cliente)
    return res.data
  },
  
  // CU-02 | RF-10 | E12 - actualizarCliente()
  actualizar: async (id: number, cliente: Partial<ClienteCreate>): Promise<ClienteResponse> => {
    const res = await axiosClient.put(`/clientes/${id}`, cliente)
    return res.data
  },
  
  // CU-02 | RF-10 | E12 - eliminarCliente()
  eliminar: async (id: number): Promise<ClienteResponse> => {
    const res = await axiosClient.delete(`/clientes/${id}`)
    return res.data
  }
}
export default clientesApi
