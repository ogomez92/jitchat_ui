<script setup lang="ts">
import { ref } from 'vue';
import JitChatHeader from '@src/components/JitChatHeader.vue';
import UserEntryForm from '@src/components/UserEntryForm.vue';
import User from '@src/interfaces/user';

const userEntryFormShouldShow = ref(true);

const handleUserSet = (addedUser: User) => {
console.log(addedUser);
}
</script>
<template>
  <JitChatHeader />
  <UserEntryForm
  v-if="userEntryFormShouldShow"
  @user-set-success="handleUserSet"
  />
</template>