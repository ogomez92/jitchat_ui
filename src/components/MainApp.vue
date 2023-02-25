<script setup lang="ts">
import { ref } from 'vue';
import JitChatHeader from '@src/components/JitChatHeader.vue';
import UserEntryForm from '@src/components/UserEntryForm.vue';

const userEntryFormShouldShow = ref(true);

const submitUserEntryForm = (data: string) => {
  console.log(data);
  userEntryFormShouldShow.value = false;
}
</script>
<template>
  <JitChatHeader />
  <UserEntryForm
  v-if="userEntryFormShouldShow"
  @submit="submitUserEntryForm"
  />
</template>