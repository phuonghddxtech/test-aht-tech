import { useToastStore } from '../stores/toast'

export function useToast() {
  const toastStore = useToastStore()
  
  return {
    // Direct access to store methods
    success: toastStore.success,
    error: toastStore.error,
    warning: toastStore.warning,
    info: toastStore.info,
    
    // Convenience methods with common use cases
    showSuccess: (message: string) => {
      toastStore.success('Thành công', message)
    },
    
    showError: (message: string) => {
      toastStore.error('Lỗi', message, 0) // Don't auto-dismiss errors
    },
    
    showWarning: (message: string) => {
      toastStore.warning('Cảnh báo', message)
    },
    
    showInfo: (message: string) => {
      toastStore.info('Thông tin', message)
    },
    
    // API response handlers
    handleApiSuccess: (message: string = 'Thao tác thành công') => {
      toastStore.success('Thành công', message)
    },
    
    handleApiError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || 
                    (error as { message?: string })?.message || 
                    'Đã xảy ra lỗi, vui lòng thử lại'
      toastStore.error('Lỗi', message, 0)
    },
    
    // Form submission handlers
    handleFormSuccess: (action: string = 'lưu') => {
      toastStore.success('Thành công', `Đã ${action} thành công`)
    },
    
    handleFormError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || 
                    (error as { message?: string })?.message || 
                    'Có lỗi xảy ra khi xử lý form'
      toastStore.error('Lỗi form', message, 0)
    },
    
    // Clear all toasts
    clear: toastStore.clearToasts
  }
}
