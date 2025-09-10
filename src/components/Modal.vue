<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { generateId } from '../utils'
import type { ComponentSize } from '../types'

interface Props {
  modelValue: boolean
  title?: string
  size?: ComponentSize
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

interface Emits {
  'update:modelValue': [value: boolean]
  close: []
  open: []
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true
})

const emit = defineEmits<Emits>()

const titleId = ref(generateId())

const modalClasses = computed(() => [
  'modal',
  `modal-${props.size}`
])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    closeModal()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    closeModal()
  }
}

// Watch for modal open/close to manage body scroll
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
        <div
          class="modal-container"
          :class="modalClasses"
          @click.stop
          role="dialog"
          :aria-labelledby="titleId"
          aria-modal="true"
        >
          <!-- Header -->
          <div v-if="$slots.header || title || closable" class="modal-header">
            <div class="modal-title-section">
              <h3 v-if="title" :id="titleId" class="modal-title">{{ title }}</h3>
              <slot name="header" />
            </div>
            <button
              v-if="closable"
              type="button"
              class="modal-close"
              @click="closeModal"
              aria-label="Đóng modal"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 1000;
}

.modal-container {
  background-color: var(--color-background);
  box-shadow: var(--shadow-lg);
  height: 100vh;
  width: 500px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

/* Sizes */
.modal-small {
  max-width: 24rem;
}

.modal-medium {
  max-width: 32rem;
}

.modal-large {
  max-width: 48rem;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f1f5f9;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-title-section {
  flex: 1;
}

.modal-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.5px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 18px;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  line-height: 1;
}

.modal-close:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 0;
  flex: 1;
  overflow-y: auto;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid var(--color-border);
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    width: 100vw;
    max-width: 100vw;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>
