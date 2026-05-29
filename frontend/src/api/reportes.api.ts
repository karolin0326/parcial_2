import axiosClient from './axiosClient'

export const reportesApi = {
  diario: async (fecha: string): Promise<any> => {
    const res = await axiosClient.get(`/reportes/diario?dia=${fecha}`)
    return res.data
  }
}
export default reportesApi
