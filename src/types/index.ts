// Export all types from a central location
export * from './common'
export * from './product'

// Re-export Vue types that are commonly used
export type { 
  Component, 
  ComponentPublicInstance, 
  ComputedRef, 
  Ref 
} from 'vue'

export type { RouteLocationNormalized, Router } from 'vue-router'
