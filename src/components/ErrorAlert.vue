<script setup lang="ts">
import playSound from '@src/helpers/sound_player';
import errorSound from '@src/assets/error.mp3';
import { ref, onMounted } from 'vue';

  defineProps({
    errorMessage: {
      type: String,
      required: true
    }
  });

  const errorOKButton = ref();
  onMounted(() => {
    playSound(errorSound);
    errorOKButton.value.focus();
  })
  function reloadPage() {
    window.location.reload();
  }
</script>
<template>
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong class="font-bold">Error: </strong>
    <span class="block sm:inline">{{ errorMessage }}</span>
    <button ref="errorOKButton" class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="reloadPage">
      OK
    </button>
  </div>
</template>
<style scoped>
  .bg-red-100 {
    background-color: #FEE2E2;
  }
  .border-red-400 {
    border-color: #EF4444;
  }
  .text-red-700 {
    color: #DC2626;
  }
</style>