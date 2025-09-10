<script setup lang="ts">
import { ref, computed } from 'vue'
import QuantityInput from './QuantityInput.vue'
import Button from './Button.vue'
import { useToast } from '../composables/useToast'
import type { OptionType } from '../types/product'
import basketIcon from '../assets/images/basket-add.svg'

interface Props {
  productUid: string
  optionTypes: OptionType[]
  totalPrice: number
  quantity: number
}

interface Emits {
  'update:quantity': [value: number]
  'add-to-cart': [data: {
    productUid: string
    quantity: number
    selectedOptions: Record<number, string>
    totalPrice: number
  }]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Use computed to sync with parent quantity
const quantity = computed({
  get: () => props.quantity,
  set: (value: number) => emit('update:quantity', value)
})
const isLoading = ref(false)
const toast = useToast()

const handleAddToCart = async () => {
  isLoading.value = true
  
  try {
    // Collect selected options
    const selectedOptions: Record<number, string> = {}
    props.optionTypes.forEach(optionType => {
      if (optionType.selectedOptionUid) {
        selectedOptions[optionType.optionTypeId] = optionType.selectedOptionUid
      }
    })
    
    // Prepare cart data
    const cartData = {
      productUid: props.productUid,
      quantity: quantity.value,
      selectedOptions,
      totalPrice: props.totalPrice
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Emit add to cart event
    emit('add-to-cart', cartData)
    
    // Show success notification
    toast.success(
      'Success', 
      'The product has been added to your cart'
    )
    
  } catch (error) {
    console.error('Error adding to cart:', error)
    toast.error(
      'Error',
      'Failed to add product to cart. Please try again.'
    )
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="add-to-cart">
    <div class="quantity-and-cart">
      <QuantityInput 
        v-model="quantity" 
        :min-value="1"
        :max-value="99"
      />
      
      <Button 
        variant="dark"
        size="large"
        :loading="isLoading"
        loading-text="Adding..."
        @click="handleAddToCart"
        class="add-to-cart-btn"
      >
        <img :src="basketIcon" alt="Add to cart" width="20" height="20" class="cart-icon" />
        ADD TO CART
      </Button>
    </div>
  </div>
</template>

<style scoped>
.add-to-cart {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quantity-and-cart {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.add-to-cart-btn {
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: unset;
}

.cart-icon {
  flex-shrink: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .quantity-and-cart {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .add-to-cart-btn {
    min-width: auto;
    width: 100%;
  }
}
</style>
