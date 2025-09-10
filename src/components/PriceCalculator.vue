<script setup lang="ts">
import { computed } from 'vue'
import type { OptionType } from '../types/product'
import { formatCurrency } from '../utils/formatters'

interface Props {
  optionTypes: OptionType[]
  quantity: number
  showBreakdown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showBreakdown: false
})

interface PriceAddition {
  id: string
  label: string
  amount: number
}

// Calculate base price from the selected size option (optionTypeId: 1)
const basePrice = computed(() => {
  const sizeOptionType = props.optionTypes.find(ot => ot.optionTypeId === 1)
  if (!sizeOptionType) return 0
  
  const selectedOption = sizeOptionType.options.find(
    option => option.uid === sizeOptionType.selectedOptionUid
  )
  
  return selectedOption?.price || 0
})

// Calculate additional price from other options (excluding size)
const additionalPrice = computed(() => {
  let total = 0
  
  props.optionTypes.forEach(optionType => {
    // Skip size option as it's considered base price
    if (optionType.optionTypeId === 1) return
    
    const selectedOption = optionType.options.find(
      option => option.uid === optionType.selectedOptionUid
    )
    
    if (selectedOption && selectedOption.price > 0) {
      total += selectedOption.price
    }
  })
  
  return total
})

// Get price additions for breakdown
const priceAdditions = computed((): PriceAddition[] => {
  const additions: PriceAddition[] = []
  
  props.optionTypes.forEach(optionType => {
    // Skip size option as it's considered base price
    if (optionType.optionTypeId === 1) return
    
    const selectedOption = optionType.options.find(
      option => option.uid === optionType.selectedOptionUid
    )
    
    if (selectedOption && selectedOption.price > 0) {
      additions.push({
        id: `${optionType.optionTypeId}-${selectedOption.uid}`,
        label: optionType.displayName,
        amount: selectedOption.price
      })
    }
  })
  
  return additions
})

// Calculate total price per unit
const unitPrice = computed(() => {
  return basePrice.value + additionalPrice.value
})

// Calculate total price including quantity
const totalPrice = computed(() => {
  return unitPrice.value * props.quantity
})

// Formatted prices
const formattedBasePrice = computed(() => formatPrice(basePrice.value))
const formattedTotalPrice = computed(() => formatPrice(totalPrice.value))

const formatPrice = (priceInCents: number): string => {
  return formatCurrency(priceInCents / 100)
}

// Expose calculated values for parent component
defineExpose({
  unitPrice,
  totalPrice,
  basePrice,
  additionalPrice
})
</script>

<template>
  <div class="price-calculator">
    <div class="price-display">
      <span class="price-amount">{{ formattedTotalPrice }}</span>
    </div>
    
    <div v-if="showBreakdown" class="price-breakdown">
      <div class="breakdown-item">
        <span class="breakdown-label">Base Price:</span>
        <span class="breakdown-value">{{ formattedBasePrice }}</span>
      </div>
      
      <div 
        v-for="addition in priceAdditions" 
        :key="addition.id"
        class="breakdown-item"
      >
        <span class="breakdown-label">{{ addition.label }}:</span>
        <span class="breakdown-value">+{{ formatPrice(addition.amount) }}</span>
      </div>
      
      <div v-if="quantity > 1" class="breakdown-item">
        <span class="breakdown-label">Quantity ({{ quantity }}):</span>
        <span class="breakdown-value">×{{ quantity }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-calculator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-display {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.price-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

.price-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  border: 1px solid var(--color-border);
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
}

.breakdown-label {
  color: var(--color-text-light);
}

.breakdown-value {
  color: var(--color-text);
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .price-amount {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .price-amount {
    font-size: 1.5rem;
  }
  
  .breakdown-item {
    font-size: var(--font-size-sm);
  }
}
</style>
