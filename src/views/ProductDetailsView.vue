<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  ImageCarousel, 
  ProductInfo, 
  ConfigurationOptions, 
  PriceCalculator, 
  AddToCart 
} from '../components'
import { arcVanityProductData } from '../data/productData'
import type { CartItem } from '../types/product'

// Reactive product data
const productData = ref(arcVanityProductData)
const quantity = ref(1)
const priceCalculator = ref<InstanceType<typeof PriceCalculator>>()

// Auto-select first option for each configuration option on load
const initializeDefaultSelections = () => {
  productData.value.optionTypes.forEach(optionType => {
    if (!optionType.selectedOptionUid && optionType.options.length > 0) {
      optionType.selectedOptionUid = optionType.options[0].uid
    }
  })
}

// Handle option selection
const handleOptionSelected = (optionTypeId: number, optionUid: string) => {
  const optionType = productData.value.optionTypes.find(
    ot => ot.optionTypeId === optionTypeId
  )
  
  if (optionType) {
    optionType.selectedOptionUid = optionUid
  }
}

// Get total price from price calculator
const totalPrice = computed(() => {
  return priceCalculator.value?.totalPrice || 0
})

// Handle add to cart
const handleAddToCart = (cartData: CartItem) => {
  console.log('Product added to cart:', cartData)
  
  // Here you would typically:
  // 1. Send data to your cart store/service
  // 2. Update cart state
  // 3. Potentially redirect or update UI
  
  // For now, just log the cart data
  const cartItem: CartItem = {
    productUid: cartData.productUid,
    quantity: cartData.quantity,
    selectedOptions: cartData.selectedOptions,
    totalPrice: cartData.totalPrice
  }
  
  console.log('Cart item created:', cartItem)
}

onMounted(() => {
  initializeDefaultSelections()
})
</script>

<template>
  <div class="product-details-view">
    <div class="product-container">
      <!-- Image Carousel Section -->
      <div class="image-section">
        <ImageCarousel :images="productData.product.images" />
      </div>

      <!-- Product Information Section -->
      <div class="info-section">
        <!-- Product Name & Description -->
        <ProductInfo :product="productData.product" />
        
        <!-- Configuration Options -->
        <ConfigurationOptions 
          :option-types="productData.optionTypes"
          @option-selected="handleOptionSelected"
        />
        
        <!-- Price Display -->
        <PriceCalculator 
          ref="priceCalculator"
          :option-types="productData.optionTypes"
          :quantity="quantity"
        />
        
        <!-- Add to Cart Section -->
        <AddToCart 
          :product-uid="productData.product.uid"
          :option-types="productData.optionTypes"
          :total-price="totalPrice"
          v-model:quantity="quantity"
          @add-to-cart="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-details-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  background-color: var(--color-background);
}

.product-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .product-container {
    gap: 3rem;
  }
}

@media (max-width: 1024px) {
  .product-container {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .product-details-view {
    padding: 1rem;
  }
  
  .product-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .image-section {
    position: static;
  }
  
  .info-section {
    gap: 2rem;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .product-details-view {
    padding: 0.5rem;
  }
  
  .product-container {
    gap: 1.5rem;
  }
  
  .info-section {
    gap: 1.5rem;
  }
}
</style>
