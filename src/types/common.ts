// Common types used across the application

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export type ComponentSize = 'small' | 'medium' | 'large'
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'dark'

export interface LoadingState {
  isLoading: boolean
  error: string | null
}