<script setup lang="ts">
import { ref } from 'vue';
import JitChatHeader from '@src/components/JitChatHeader.vue';
import UserEntryForm from '@src/components/UserEntryForm.vue';
import User from '@src/interfaces/user';
import state_manager from '@src/managers/state_manager';
import EventManager from '@src/managers/event_manager'

const userEntryFormShouldShow = ref(true);

const handleUserSet = (addedUser: User) => {
  state_manager.eventManager = new EventManager(addedUser)
  state_manager.eventManager.acceptInvitations();
}
</script>
<template>
  <JitChatHeader />
  <UserEntryForm v-if="userEntryFormShouldShow" @user-set-success="handleUserSet" />
</template>