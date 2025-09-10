<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '../stores/toast'
import type { Toast } from '../types'

const toastStore = useToastStore()

const toasts = computed(() => toastStore.toasts)

const getToastClasses = (toast: Toast) => [
  'toast',
  `toast-${toast.type}`
]

const getToastIcon = (type: Toast['type']) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type]
}

const removeToast = (id: string) => {
  toastStore.removeToast(id)
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="getToastClasses(toast)"
          @click="removeToast(toast.id)"
        >
          <div class="toast-icon">
            {{ getToastIcon(toast.type) }}
          </div>
          <div class="toast-content">
            <div class="toast-title">{{ toast.title }}</div>
            <div v-if="toast.message" class="toast-message">{{ toast.message }}</div>
          </div>
          <button class="toast-close" @click.stop="removeToast(toast.id)">
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 20rem;
  width: 100%;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  transition: all 0.2s ease-in-out;
}

.toast:hover {
  transform: translateX(-4px);
}

.toast-success {
  border-left: 4px solid var(--color-success);
}

.toast-error {
  border-left: 4px solid var(--color-error);
}

.toast-warning {
  border-left: 4px solid var(--color-warning);
}

.toast-info {
  border-left: 4px solid var(--color-primary);
}

.toast-icon {
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toast-success .toast-icon {
  color: var(--color-success);
  background-color: rgba(16, 185, 129, 0.1);
}

.toast-error .toast-icon {
  color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.1);
}

.toast-warning .toast-icon {
  color: var(--color-warning);
  background-color: rgba(245, 158, 11, 0.1);
}

.toast-info .toast-icon {
  color: var(--color-primary);
  background-color: rgba(59, 130, 246, 0.1);
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  color: var(--color-text);
  font-size: var(--font-size-base);
  line-height: 1.4;
}

.toast-message {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
  line-height: 1.4;
  margin-top: 0.25rem;
}

.toast-close {
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  font-size: var(--font-size-sm);
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  transition: all 0.2s ease-in-out;
}

.toast-close:hover {
  background-color: var(--color-surface);
  color: var(--color-text);
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    max-width: none;
  }
  
  .toast {
    padding: 0.75rem;
  }
  
  .toast:hover {
    transform: none;
  }
}
</style>
