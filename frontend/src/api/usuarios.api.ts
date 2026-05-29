import axiosClient from './axiosClient'
import { UsuarioCreate, UsuarioResponse, Token } from '../types/usuario.types'

export const usuariosApi = {
  login: async (username: string, password: string): Promise<Token> => {
    // Formulario codificado en URL como exige OAuth2
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    
    const res = await axiosClient.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return res.data
  },

  me: async (): Promise<UsuarioResponse> => {
    const res = await axiosClient.get('/auth/me')
    return res.data
  },

  listar: async (skip = 0, limit = 100): Promise<UsuarioResponse[]> => {
    const res = await axiosClient.get(`/usuarios/?skip=${skip}&limit=${limit}`)
    return res.data
  },

  crear: async (usuario: UsuarioCreate): Promise<UsuarioResponse> => {
    const res = await axiosClient.post('/usuarios/', usuario)
    return res.data
  },

  actualizar: async (id: number, usuario: Partial<UsuarioCreate>): Promise<UsuarioResponse> => {
    const res = await axiosClient.put(`/usuarios/${id}`, usuario)
    return res.data
  },

  eliminar: async (id: number): Promise<UsuarioResponse> => {
    const res = await axiosClient.delete(`/usuarios/${id}`)
    return res.data
  }
}
export default usuariosApi
