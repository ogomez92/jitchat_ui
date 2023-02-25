<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StorageService from '@src/services/storage_service';
import StorageKey from '@src/enums/storage_key';
import JitChatHeader from '@src/components/JitChatHeader.vue';

const { t } = useI18n({ useScope: 'global' })
</script>
<template>
  <JitChatHeader />
</template>