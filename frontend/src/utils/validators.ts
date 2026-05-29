/**
 * Valida si una dirección de correo tiene el formato correcto.
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

/**
 * Valida un formato básico de NIT colombiano.
 * Ejemplo válido: 900123456-1 o 900.123.456-1 o 12345678-9
 */
export const validateNit = (nit: string): boolean => {
  if (!nit) return false
  const re = /^\d{1,3}(\.?\d{3}){2}-\d{1}$/
  // Permitimos también numérico simple de 7 a 10 dígitos si es persona natural
  const reSimple = /^\d{7,10}$/
  return re.test(nit) || reSimple.test(nit)
}

/**
 * Valida que un campo no esté vacío.
 */
export const validateRequired = (val: any): boolean => {
  if (val === undefined || val === null) return false
  if (typeof val === 'string') return val.trim().length > 0
  return true
}
export default { validateEmail, validateNit, validateRequired }
