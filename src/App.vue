<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toast } from './components'
</script>

<template>
  <div id="app">
    <main class="main-content">
      <RouterView />
    </main>
    <Toast />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
