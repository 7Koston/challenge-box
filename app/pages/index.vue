<script setup lang="ts">
const { t } = useI18n();

useHeadSafe({
  title: t('page.title'),
});

const challengesLeft = ref<string[]>([]);
const challengesOrigin = ref<string[]>([]);

const currentChallenge = ref<string>();

const isDragging = ref(false);
const fileInput = ref<HTMLInputElement>();

function openFileDialog() {
  fileInput.value?.click();
}

function onFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    handleFileUpload(file);
  }
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;

  const file = event.dataTransfer?.files[0];
  if (file) {
    handleFileUpload(file);
  }
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function onDragLeave() {
  isDragging.value = false;
}

function showRandomChallenge() {
  if (challengesLeft.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * challengesLeft.value.length);
    currentChallenge.value = challengesLeft.value[randomIndex];
    // Remove the drawn challenge from the list
    challengesLeft.value.splice(randomIndex, 1);
  }
}

async function handleFileUpload(file: File) {
  if (file.type !== 'text/plain') {
    return;
  }

  const text = await file.text();
  const parsedChallenges = text
    .split('\n')
    .filter((line) => line.trim().length > 0);
  challengesLeft.value = [...parsedChallenges];
  challengesOrigin.value = [...parsedChallenges];
  currentChallenge.value = undefined;
}
</script>

<template>
  <div class="root">
    <!-- Floating bubbles background -->
    <div v-if="challengesOrigin.length > 0" class="bubbles-container">
      <div
        v-for="(challenge, index) in challengesOrigin"
        :key="index"
        class="bubble"
        :style="{
          '--delay': `${index * 0.5}s`,
          '--duration': `${15 + (index % 10) * 2}s`,
          '--x-offset': `${(index * 73) % 100}vw`,
          '--x-drift': `${((index % 3) - 1) * 80}px`,
          '--bubble-color': `hsl(${(index * 137.5) % 360}, 70%, 60%)`,
        }">
        <span class="bubble-text">{{ challenge }}</span>
      </div>
    </div>

    <!-- Upload area when no challenges loaded -->
    <div
      v-if="challengesLeft.length <= 0 && challengesOrigin.length === 0"
      :class="['upload-area', isDragging ? 'dragging' : '']"
      @click="openFileDialog"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave">
      <div class="upload-content">
        <Icon name="ph:upload" class="upload-icon" />
        <p class="upload-text">{{ $t('upload.clickOrDrag') }}</p>
        <p class="upload-subtext">{{ $t('upload.description') }}</p>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept=".txt"
        @change="onFileSelect"
        style="display: none" />
    </div>

    <!-- Clickable area when challenges loaded -->
    <Transition v-else name="fade" mode="out-in">
      <div
        v-if="!currentChallenge"
        key="clickable"
        class="clickable-area"
        @click="showRandomChallenge">
        <p class="hint-text">{{ $t('challenge.hint') }}</p>
      </div>

      <!-- Challenge display -->
      <div
        v-else
        key="challenge"
        class="challenge"
        @click="currentChallenge = undefined">
        <p class="challenge_text">{{ currentChallenge }}</p>
        <p class="challenge_hint">{{ $t('challenge.clickToContinue') }}</p>
      </div>
    </Transition>

    <!-- Counter -->
    <div v-if="challengesOrigin.length > 0" class="counter">
      {{ challengesLeft.length }} / {{ challengesOrigin.length }}
    </div>
  </div>
</template>

<style lang="css" scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background-color: var(--color-background);
  overflow: hidden;
  position: relative;
}

/* Upload area */
.upload-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 90%;
  max-width: 600px;
  min-height: 300px;

  padding: 3rem 2rem;
  box-sizing: border-box;

  background-color: var(--color-surface-container);
  border: 2px dashed var(--color-outline-variant);
  border-radius: 16px;

  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.upload-area:hover {
  background-color: var(--color-surface-container-high);
  border-color: var(--color-primary);
}

.upload-area.dragging {
  background-color: var(--color-primary-container);
  border-color: var(--color-primary);
  border-style: solid;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 64px;
  height: 64px;
  color: var(--color-primary);
}

.upload-text {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-on-surface);
  margin: 0;
}

.upload-subtext {
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  margin: 0;
}

/* Clickable area */
.clickable-area {
  display: flex;
  justify-content: center;
  align-items: end;

  width: 100%;
  height: 100%;

  cursor: pointer;
  position: relative;
  z-index: 1;
}

.hint-text {
  font-size: 1rem;
  color: var(--color-on-surface-variant);
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.clickable-area:hover .hint-text {
  opacity: 1;
}

/* Challenge display */
.challenge {
  background-color: var(--color-primary-container);

  width: 90%;
  max-width: 600px;
  min-height: 10svh;

  padding: 2rem 1.5rem;
  box-sizing: border-box;

  border: 2px solid var(--color-outline-variant);
  border-radius: 16px;
  box-shadow: 0 4px 8px var(--color-shadow);
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  position: relative;
  z-index: 1;
}

.challenge:hover {
  border: 2px solid var(--color-primary);
}

.challenge_text {
  color: var(--color-on-primary-container);
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0;
}

.challenge_hint {
  color: var(--color-on-primary-container);
  font-size: 0.875rem;
  opacity: 0.7;
  margin: 0;
  text-align: center;
}

/* Counter */
.counter {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;

  padding: 0.75rem 1.25rem;
  background-color: var(--color-surface-container-high);
  border: 1px solid var(--color-outline-variant);
  border-radius: 12px;

  box-shadow: 0 2px 4px var(--color-outline);

  font-size: 1rem;
  font-weight: 500;
  color: var(--color-on-surface);
  z-index: 2;
}

/* Floating bubbles */
.bubbles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bubble {
  position: absolute;
  bottom: -150px;
  left: var(--x-offset);
  width: clamp(100px, 15vw, 200px);
  height: clamp(100px, 15vw, 200px);
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    var(--bubble-color),
    transparent
  );
  backdrop-filter: blur(20px);
  opacity: 0.15;
  animation: float var(--duration) var(--delay) infinite ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
}

.bubble-text {
  color: var(--bubble-color);
  font-size: clamp(0.7rem, 1vw, 0.9rem);

  text-align: center;
  word-wrap: break-word;
  overflow: hidden;

  line-clamp: 4;
  line-height: 1.4;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.15;
  }
  30% {
    transform: translateY(-30vh) translateX(calc(var(--x-drift) * 0.5))
      rotate(90deg) scale(1);
  }
  50% {
    transform: translateY(-50vh) translateX(var(--x-drift)) rotate(180deg)
      scale(1.1);
    opacity: 0.2;
  }
  70% {
    transform: translateY(-70vh) translateX(calc(var(--x-drift) * 0.3))
      rotate(270deg) scale(1);
  }
  90% {
    opacity: 0.15;
  }
  100% {
    transform: translateY(-110vh) translateX(0) rotate(360deg) scale(0.8);
    opacity: 0;
  }
}
</style>
