<script setup lang="ts">
import { computed } from 'vue'
import type { ComponentSize, ComponentVariant } from '../types'

interface Props {
  variant?: ComponentVariant
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
  outlined?: boolean
}

interface Emits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  loadingText: 'Đang tải...',
  fullWidth: false,
  outlined: false
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    'btn-outlined': props.outlined,
    'btn-full-width': props.fullWidth,
    'btn-loading': props.loading,
    'btn-disabled': props.disabled
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-if="!loading" />
    <span v-if="loading">{{ loadingText }}</span>
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  position: relative;
  white-space: nowrap;
}

.btn:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Variants */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.btn-primary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

.btn-secondary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #475569;
  border-color: #475569;
}

.btn-success {
  background-color: var(--color-success);
  color: white;
  border-color: var(--color-success);
}

.btn-dark {
  background-color: var(--color-dark);
  color: white;
  border-color: var(--color-dark);
}

.btn-success:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #059669;
  border-color: #059669;
}

.btn-warning {
  background-color: var(--color-warning);
  color: white;
  border-color: var(--color-warning);
}

.btn-warning:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #d97706;
  border-color: #d97706;
}

.btn-error {
  background-color: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

.btn-error:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: #dc2626;
  border-color: #dc2626;
}

/* Outlined variants */
.btn-outlined {
  background-color: transparent;
}

.btn-outlined.btn-primary {
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn-outlined.btn-primary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-primary);
  color: white;
}

.btn-outlined.btn-secondary {
  color: var(--color-secondary);
  border-color: var(--color-secondary);
}

.btn-outlined.btn-secondary:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-secondary);
  color: white;
}

.btn-outlined.btn-success {
  color: var(--color-success);
  border-color: var(--color-success);
}

.btn-outlined.btn-success:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-success);
  color: white;
}

.btn-outlined.btn-warning {
  color: var(--color-warning);
  border-color: var(--color-warning);
}

.btn-outlined.btn-warning:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-warning);
  color: white;
}

.btn-outlined.btn-error {
  color: var(--color-error);
  border-color: var(--color-error);
}

.btn-outlined.btn-error:hover:not(.btn-disabled):not(.btn-loading) {
  background-color: var(--color-error);
  color: white;
}

/* Sizes */
.btn-small {
  padding: 0.25rem 0.75rem;
  font-size: var(--font-size-sm);
}

.btn-medium {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-base);
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-lg);
}

/* States */
.btn-full-width {
  width: 100%;
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  cursor: not-allowed;
}

/* Loading spinner */
.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
