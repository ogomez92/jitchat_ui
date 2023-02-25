<script setup lang="ts">
import { onMounted } from 'vue';
import DisclaimerView from './components/DisclaimerView.vue'
import JitChatFooter from '@src/components/JitChatFooter.vue';
import StorageService from '@src/services/storage_service';
import StorageKey from '@src/enums/storage_key';
import StateManager from '@src/managers/state_manager';
import MainApp from '@src/components/MainApp.vue';

const MS_UNTIL_DISCLAIMER_SHOULD_SHOW_AGAIN = 7 * 24 * 60 * 60 * 1000;

onMounted(() => {
  const lastDisclaimerShowDate = StorageService.getKey(StorageKey.DISCLAIMER_SHOW_DATE);

  StateManager.disclaimerShouldShow = !lastDisclaimerShowDate || new Date().getTime() - parseInt(lastDisclaimerShowDate) > MS_UNTIL_DISCLAIMER_SHOULD_SHOW_AGAIN;
})
</script>
<template>
  <DisclaimerView v-if="StateManager.disclaimerShouldShow" />
  <MainApp v-else />
  <JitChatFooter/>
</template>
