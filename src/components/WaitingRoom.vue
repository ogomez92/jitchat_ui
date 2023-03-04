<script setup lang="ts">
import ErrorAlert from '@src/components/ErrorAlert.vue'
import state_manager from '@src/managers/state_manager';
defineProps({
    userId: {
      type: String,
      required: true
    }
  });
</script>
<template>
  <ErrorAlert 
  v-if="state_manager.errorMessage"
  :error-message="state_manager.errorMessage"
  />
</template>