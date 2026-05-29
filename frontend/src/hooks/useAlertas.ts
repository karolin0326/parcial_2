import { useEffect } from 'react'
import { useAlertaStore } from '../store/alertaStore'

export const useAlertas = (autoload = false) => {
  const { alertas, isLoading, error, fetchAlertas, resolverAlerta } = useAlertaStore()

  useEffect(() => {
    if (autoload) {
      fetchAlertas()
    }
  }, [autoload, fetchAlertas])

  return {
    alertas,
    isLoading,
    error,
    fetchAlertas,
    resolverAlerta
  }
}
export default useAlertas
