<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ProductImage } from '../types/product'
import arrowLeftIcon from '../assets/images/arrow-left.svg'
import arrowRightIcon from '../assets/images/arrow-right.svg'

interface Props {
  images: ProductImage[]
}

const props = defineProps<Props>()

const currentImageIndex = ref(0)
const isImageLoading = ref(false)
const imageLoadError = ref(false)

// Find primary image or default to first image
const findPrimaryImageIndex = () => {
  const primaryIndex = props.images.findIndex(img => img.isPrimary)
  return primaryIndex !== -1 ? primaryIndex : 0
}

const currentImage = computed(() => {
  return props.images[currentImageIndex.value] || props.images[0]
})

const nextImage = () => {
  if (props.images.length <= 1) return
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length
}

const previousImage = () => {
  if (props.images.length <= 1) return
  currentImageIndex.value = currentImageIndex.value === 0 
    ? props.images.length - 1 
    : currentImageIndex.value - 1
}

const setCurrentImage = (index: number) => {
  if (index >= 0 && index < props.images.length) {
    currentImageIndex.value = index
  }
}

const handleImageLoad = () => {
  isImageLoading.value = false
  imageLoadError.value = false
}

const handleImageError = () => {
  isImageLoading.value = false
  imageLoadError.value = true
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  currentImageIndex.value = findPrimaryImageIndex()
  document.addEventListener('keydown', handleKeydown)
})

// Clean up event listener
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="image-carousel">
    <!-- Main Image Display -->
    <div class="main-image-container">
      <div class="main-image-wrapper">
        <img 
          :src="currentImage.url" 
          :alt="currentImage.alt"
          class="main-image"
          @load="handleImageLoad"
          @error="handleImageError"
        />
        
        <!-- Navigation Arrows -->
        <button 
          class="nav-arrow nav-arrow-left"
          @click="previousImage"
          :disabled="images.length <= 1"
          aria-label="Previous image"
        >
          <img :src="arrowLeftIcon" alt="Previous" width="24" height="24" />
        </button>
        
        <button 
          class="nav-arrow nav-arrow-right"
          @click="nextImage"
          :disabled="images.length <= 1"
          aria-label="Next image"
        >
          <img :src="arrowRightIcon" alt="Next" width="24" height="24" />
        </button>
      </div>
    </div>

    <!-- Thumbnail Images -->
    <div v-if="images.length > 1" class="thumbnails-container">
      <div class="thumbnails-wrapper">
        <button
          v-for="(image, index) in images"
          :key="image.id"
          class="thumbnail-button"
          :class="{ active: currentImageIndex === index }"
          @click="setCurrentImage(index)"
          :aria-label="`View image ${index + 1}`"
        >
          <img 
            :src="image.url" 
            :alt="image.alt"
            class="thumbnail-image"
            loading="lazy"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-carousel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
}

/* Main Image Container */
.main-image-container {
  position: relative;
  width: fit-content;
  max-width: 100%;
  background-color: var(--color-surface);
  overflow: hidden;
}

.main-image-wrapper {
  position: relative;
  width: 588px;
  height: 588px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: opacity 0.3s ease;
}

/* Navigation Arrows */
.nav-arrow {
  position: absolute;
  top: 93%;
  transform: translateY(-50%);
  background-color: rgba(239, 242, 246, 0.8);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text);
  box-shadow: var(--shadow);
  z-index: 2;
}

.nav-arrow:hover:not(:disabled) {
  background-color: white;
  box-shadow: var(--shadow-lg);
  transform: translateY(-50%) scale(1.05);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow-left {
  right: 4.5rem;
}

.nav-arrow-right {
  right: 1rem;
}

/* Thumbnails */
.thumbnails-container {
  width: 100%;
}

.thumbnails-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
  width: 588px;
}

.thumbnails-wrapper::-webkit-scrollbar {
  height: 4px;
}

.thumbnails-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.thumbnails-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--color-border);
  border-radius: 2px;
}

.thumbnail-button {
  flex-shrink: 0;
  width: 135px;
  height: 135px;
  border: 1px solid transparent;
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: all 0.2s ease;
}

.thumbnail-button:hover {
  border-color: rgba(35, 31, 32, 1);
  transform: translateY(-2px);
}

.thumbnail-button.active {
  border-color: rgba(35, 31, 32, 1);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-image-wrapper {
    width: 350px;
    height: 350px;
  }
  
  .thumbnails-wrapper {
    width: 350px;
    gap: 8px;
  }
  
  .thumbnail-button {
    width: 80px;
    height: 80px;
  }
  
  .nav-arrow {
    width: 40px;
    height: 40px;
  }
  
  .nav-arrow-left {
    left: 0.5rem;
  }
  
  .nav-arrow-right {
    right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .main-image-wrapper {
    width: 280px;
    height: 280px;
  }
  
  .thumbnails-wrapper {
    width: 280px;
    gap: 6px;
  }
  
  .thumbnail-button {
    width: 63px;
    height: 63px;
  }
  
  .nav-arrow {
    width: 36px;
    height: 36px;
  }
}
</style>
