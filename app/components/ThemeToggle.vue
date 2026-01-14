<script setup lang="ts">
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>

<template>
  <button class="theme-toggle" @click="toggleTheme">
    <Icon
      v-if="colorMode.value === 'light'"
      name="ph:sun"
      class="theme-toggle_icon" />
    <Icon v-else name="ph:moon" class="theme-toggle_icon" />
  </button>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 1rem;
  right: 1rem;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border: none;

  background-color: var(--color-surface-container-high);
  color: var(--color-on-surface);

  cursor: pointer;

  transition: all 0.2s ease;

  box-shadow: 0 2px 4px var(--color-outline);

  z-index: 2;
}

.theme-toggle:hover {
  background-color: var(--color-primary-container);
  color: var(--color-on-primary-container);
  transform: scale(1.05);
}

.theme-toggle_icon {
  width: 24px;
  height: 24px;
}
</style>
