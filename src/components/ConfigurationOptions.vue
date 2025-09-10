<script setup lang="ts">
import { ref } from 'vue'
import type { OptionType, Option } from '../types/product'
import Modal from './Modal.vue'
import { formatCurrency } from '../utils/formatters'

interface Props {
  optionTypes: OptionType[]
}

interface Emits {
  'option-selected': [optionTypeId: number, optionUid: string]
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const isModalOpen = ref(false)
const currentOptionType = ref<OptionType | null>(null)

const getSelectedOptionName = (optionType: OptionType): string => {
  const selectedOption = optionType.options.find(
    option => option.uid === optionType.selectedOptionUid
  )
  return selectedOption?.displayName || 'Select option'
}

const openModal = (optionType: OptionType) => {
  currentOptionType.value = optionType
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  currentOptionType.value = null
}

const selectOption = (option: Option) => {
  if (currentOptionType.value) {
    emit('option-selected', currentOptionType.value.optionTypeId, option.uid)
    closeModal()
  }
}

const formatPrice = (priceInCents: number): string => {
  return formatCurrency(priceInCents / 100)
}
</script>

<template>
  <div class="configuration-options">
    <h3 class="section-title">CHOOSE OPTIONS</h3>
    
    <div class="options-list">
      <div 
        v-for="optionType in optionTypes" 
        :key="optionType.optionTypeId"
        class="option-item"
      >
        <div class="option-label">{{ optionType.displayName }}</div>
        <button 
          class="option-value"
          @click="openModal(optionType)"
        >
          {{ getSelectedOptionName(optionType) }}
        </button>
      </div>
    </div>

    <!-- Configuration Modal -->
    <Modal 
      v-model="isModalOpen" 
      :title="currentOptionType?.displayName?.toUpperCase()"
      size="medium"
      @close="closeModal"
    >
      <template #default>
        <div v-if="currentOptionType" class="modal-options">
          <div 
            v-for="option in currentOptionType.options"
            :key="option.uid"
            class="modal-option"
            :class="{ 'selected': option.uid === currentOptionType.selectedOptionUid }"
            @click="selectOption(option)"
          >
            <div class="option-content">
              <div class="option-name">{{ option.displayName }}</div>
              <div v-if="option.price > 0" class="option-price">
                +{{ formatPrice(option.price) }}
              </div>
            </div>
            <div class="option-radio-container">
              <div 
                class="option-radio"
                :class="{ 'checked': option.uid === currentOptionType.selectedOptionUid }"
              >
                <div 
                  v-if="option.uid === currentOptionType.selectedOptionUid" 
                  class="option-checkmark"
                >
                  ✓
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.configuration-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.section-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--color-text);
  margin-left: 10px;
}

.options-list {
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

.option-item:first-child {
   border-top: 1px solid var(--color-border);
}

.option-label {
  font-weight: 600;
  color: var(--color-text);
  flex-shrink: 0;
  min-width: 140px;
}

.option-value {
  background: none;
  border: none;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  font-size: var(--font-size-base);
  text-decoration: underline;
  text-decoration-color: transparent;
  flex: 1;
}

.option-value:hover {
  color: var(--color-primary);
  text-decoration-color: var(--color-primary);
  background-color: var(--color-surface);
}

/* Modal Options */
.modal-options {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 500px;
  overflow-y: auto;
}

.modal-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  min-height: 60px;
}

.modal-option:last-child {
  border-bottom: none;
}

.modal-option:hover {
  background-color: #f8fafc;
}

.modal-option.selected {
  background-color: #f8fafc;
}

.option-radio-container {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.option-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  background-color: white;
}

.option-radio.checked {
  border-color: #000;
  background-color: #000;
}

.option-checkmark {
  color: white;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
}

.option-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option-name {
  font-weight: 400;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.4;
}

.option-price {
  font-weight: 600;
  color: #059669;
  font-size: 14px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .option-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .option-label {
    min-width: auto;
  }
  
  .option-value {
    text-align: left;
    width: 100%;
  }
  
  .modal-option {
    padding: 1rem;
    min-height: 50px;
  }
  
  .option-content {
    gap: 0.125rem;
  }
  
  .option-name {
    font-size: 14px;
  }
  
  .option-price {
    font-size: 13px;
  }
}
</style>
