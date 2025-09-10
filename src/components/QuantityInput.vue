<script setup lang="ts">
import minusIcon from '../assets/images/minus.svg'
import plusIcon from '../assets/images/plus.svg'

interface Props {
  modelValue: number
  minValue?: number
  maxValue?: number
}

interface Emits {
  'update:modelValue': [value: number]
}

const props = withDefaults(defineProps<Props>(), {
  minValue: 1,
  maxValue: undefined
})

const emit = defineEmits<Emits>()

const decreaseQuantity = () => {
  const newValue = Math.max(props.modelValue - 1, props.minValue)
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue)
  }
}

const increaseQuantity = () => {
  const newValue = props.modelValue + 1
  if (!props.maxValue || newValue <= props.maxValue) {
    emit('update:modelValue', newValue)
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  
  if (!isNaN(value)) {
    const clampedValue = Math.max(
      props.minValue, 
      props.maxValue ? Math.min(value, props.maxValue) : value
    )
    emit('update:modelValue', clampedValue)
  }
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  
  if (isNaN(value) || value < props.minValue) {
    emit('update:modelValue', props.minValue)
  }
}
</script>

<template>
  <div class="quantity-input">
    <label class="quantity-label">Quantity</label>
    <div class="quantity-controls">
      <button 
        class="quantity-btn decrease"
        @click="decreaseQuantity"
        :disabled="modelValue <= minValue"
        aria-label="Decrease quantity"
      >
        <img :src="minusIcon" alt="Decrease" width="16" height="16" />
      </button>
      
      <input 
        type="number"
        :value="modelValue"
        @input="handleInput"
        @blur="handleBlur"
        :min="minValue"
        :max="maxValue"
        class="quantity-input-field"
        aria-label="Product quantity"
      />
      
      <button 
        class="quantity-btn increase"
        @click="increaseQuantity"
        :disabled="!!maxValue && modelValue >= maxValue"
        aria-label="Increase quantity"
      >
        <img :src="plusIcon" alt="Increase" width="16" height="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.quantity-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quantity-label {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  overflow: hidden;
  width: fit-content;
  padding: 2px 0;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  background-color: var(--color-white);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  transition: all 0.2s ease;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input-field {
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
  background-color: transparent;
  outline: none;
}

.quantity-input-field::-webkit-outer-spin-button,
.quantity-input-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input-field[type=number] {
  -moz-appearance: textfield;
}

/* Responsive Design */
@media (max-width: 480px) {
  .quantity-btn {
    width: 36px;
    height: 36px;
  }
  
  .quantity-input-field {
    width: 50px;
    height: 36px;
  }
}
</style>
