/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Check if value is required and not empty
 */
export const isRequired = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0
  return value !== null && value !== undefined && value !== ''
}

/**
 * Validate quantity (positive integer)
 */
export const isValidQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0
}