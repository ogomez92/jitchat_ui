<script setup lang="ts">
import { ref } from 'vue';
import JitChatHeader from '@src/components/JitChatHeader.vue';
import UserEntryForm from '@src/components/UserEntryForm.vue';
import StateManager from '@src/managers/state_manager';

const userEntryFormShouldShow = ref(true);
</script>
<template>
  <JitChatHeader />
  <UserEntryForm
  v-if="!StateManager.currentUser"
  />
</template>