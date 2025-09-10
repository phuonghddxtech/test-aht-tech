<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <RouterLink to="/" class="nav-logo">
        <h2>Product Store</h2>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  padding: 0 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 4rem;
}

.nav-logo {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 600;
}

.nav-logo h2 {
  margin: 0;
  font-size: var(--font-size-xl);
}
</style>
