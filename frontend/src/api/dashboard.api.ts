import axiosClient from './axiosClient'

export const dashboardApi = {
  obtenerMetricas: async (): Promise<any> => {
    const res = await axiosClient.get('/dashboard/metrics')
    return res.data
  }
}
export default dashboardApi
