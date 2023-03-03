<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StorageService from '@src/services/storage_service';
import StorageKey from '@src/enums/storage_key';
import StateManager from '@src/managers/state_manager';

const { t } = useI18n({ useScope: 'global' })

const hideDisclaimer = () => {
  StorageService.setKey(StorageKey.DISCLAIMER_SHOW_DATE, new Date().getTime().toString())
  StateManager.disclaimerShouldShow = false;
}
</script>

<template>
  <div id="disclaimerContainer">
    <div id="disclaimerTitleContainer" class="text-3xl font-bold mb-4">
      <h1 role="alert"> {{ t('disclaimerTitle') }}</h1>
    </div>

    <div id="disclaimerTextContainer" class="leading-7 mb-4">
      <p style="font-size: 1.2rem;"> {{ t('disclaimerParagraph1') }}</p>
      <p style="font-size: 1.2rem;"> {{ t('disclaimerParagraph2') }}</p>
      <ul class="ml-4 mb-4 list-inside">
        <li class="ml-2 mb-2"> {{ t('disclaimerListItem1') }}</li>
        <li class="ml-2 mb-2"> {{ t('disclaimerListItem2') }}</li>
        <li class="ml-2 mb-2"> {{ t('disclaimerListItem3') }}</li>
        <li class="ml-2 mb-2"> {{ t('disclaimerListItem4') }}</li>
      </ul>
      <p style="font-size: 1.2rem;"> {{ t('disclaimerParagraph3') }}</p>
    </div>
    <button
      id="disclaimerContinueButton"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      style="margin-top: 1rem;"
      @click="hideDisclaimer()"
    >
      {{  t('disclaimerContinueButton') }}
    </button>
  </div>
</template>

<style scoped>
#disclaimerContainer {
  margin: 0 1rem;
}

#disclaimerTitleContainer h1 {
  font-size: 2rem;
  font-weight: bold;
}

#disclaimerTextContainer p {
  margin-bottom: 1rem;
}

#disclaimerTextContainer ul {
  list-style: disc;
  margin-left: 1.5rem;
}

#disclaimerTextContainer li {
  margin-left: 1.5rem;
}
</style>
