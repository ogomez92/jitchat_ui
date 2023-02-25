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
  <div id="disclaimerTitleContainer" class="text-4xl font-bold mb-4">
    <h1 role="alert"> {{ t('disclaimerTitle') }}</h1>
  </div>

  <div id="disclaimerTextContainer" class="text-lg leading-7 mb-4">
    <p> {{ t('disclaimerParagraph1') }}</p>
    <p> {{ t('disclaimerParagraph2') }}</p>
    <ul class="ml-4 mb-4 list-inside">
      <li class="ml-2 mb-2"> {{ t('disclaimerListItem1') }}</li>
      <li class="ml-2 mb-2"> {{ t('disclaimerListItem2') }}</li>
      <li class="ml-2 mb-2"> {{ t('disclaimerListItem3') }}</li>
      <li class="ml-2 mb-2"> {{ t('disclaimerListItem4') }}</li>
    </ul>
    <p> {{ t('disclaimerParagraph3') }}</p>
  </div>
  <button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  @click="hideDisclaimer()"
  >
  {{  t('disclaimerContinueButton') }}
</button>

</template>
<style scoped>
#disclaimerTitleContainer h1 {
  font-size: 3rem;
  font-weight: bold;
}

#disclaimerTextContainer p {
  font-size: 1rem;
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
