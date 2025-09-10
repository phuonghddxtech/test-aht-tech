<script setup lang="ts">
import type { Product } from '../types/product'

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<template>
  <div class="product-info">
    <h1 class="product-name">{{ product.name }}</h1>
    <div class="product-description">
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-name {
  font-size: var(--font-size-4xl);
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.2;
  margin: 0;
}

.product-description {
  color: var(--color-text-light);
  line-height: 1.6;
}

.product-description p {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-name {
    font-size: var(--font-size-2xl);
  }
  
  .product-description {
    font-size: var(--font-size-sm);
  }
}
</style>
