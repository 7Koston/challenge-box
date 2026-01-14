<script setup lang="ts">
const i18nHead = useLocaleHead();
useHeadSafe({ htmlAttrs: i18nHead.value.htmlAttrs });
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <ThemeToggle />

    <NuxtPage />
  </div>
</template>

<style lang="css">
/* Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
