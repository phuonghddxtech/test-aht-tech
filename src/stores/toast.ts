import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateId } from '../utils'
import type { Toast } from '../types'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  /**
   * Add a new toast
   */
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = generateId()
    const newToast: Toast = {
      id,
      duration: 5000, // default 5 seconds
      ...toast
    }
    
    toasts.value.push(newToast)
    
    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
    
    return id
  }

  /**
   * Remove a toast by id
   */
  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  /**
   * Clear all toasts
   */
  const clearToasts = () => {
    toasts.value = []
  }

  /**
   * Show success toast
   */
  const success = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'success',
      title,
      message,
      duration
    })
  }

  /**
   * Show error toast
   */
  const error = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'error',
      title,
      message,
      duration: duration || 0 // errors don't auto-dismiss by default
    })
  }

  /**
   * Show warning toast
   */
  const warning = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'warning',
      title,
      message,
      duration
    })
  }

  /**
   * Show info toast
   */
  const info = (title: string, message?: string, duration?: number) => {
    return addToast({
      type: 'info',
      title,
      message,
      duration
    })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  }
})
