/**
 * Formatea un valor numérico a divisa colombiana (COP) o moneda regional.
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value)
}

/**
 * Formatea una cadena de fecha ISO a un formato local legible.
 */
export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    // Evitar desfase de zona horaria local
    const utcDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000)
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(utcDate)
  } catch {
    return dateStr
  }
}

/**
 * Formatea una fecha y hora completa.
 */
export const formatDateTime = (dateStr: string): string => {
  if (!dateStr) return '-'
  try {
    const d = new Date(dateStr)
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d)
  } catch {
    return dateStr
  }
}

/**
 * Mapea nombres de estados a clases o strings amigables.
 */
export const getInvoiceStatusClass = (status: string): string => {
  switch (status?.toLowerCase()) {
    case 'pagada':
      return 'badge-success'
    case 'anulada':
      return 'badge-danger'
    case 'emitida':
    default:
      return 'badge-warning'
  }
}
