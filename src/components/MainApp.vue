<script setup lang="ts">
import { Ref, ref } from 'vue';
import JitChatHeader from '@src/components/JitChatHeader.vue';
import UserEntryForm from '@src/components/UserEntryForm.vue';
import User from '@src/interfaces/user';
import WaitingRoom from '@src/components/WaitingRoom.vue';
import MeetingPoint from './MeetingPoint.vue';
const debug = true;
const userEntryFormShouldShow = ref(true);
const waitingRoomShouldShow = ref(false);
const userID = ref('')
const roomID: Ref<string | null> = ref(null);
if (debug) {
  userEntryFormShouldShow.value = false;
  waitingRoomShouldShow.value = false;
roomID.value = 'meow';
}
const handleUserSet = (addedUser: User) => {
  if (!addedUser.id) {
    console.error('The added user which was returned from server after submit did not have an ID!')
    return;
  }

  userID.value = addedUser.id;

  userEntryFormShouldShow.value = false;
  waitingRoomShouldShow.value = true;
}

const connectToRoom = (room: string) => {
  waitingRoomShouldShow.value = false;
  roomID.value = room;
}
</script>
<template>
  <JitChatHeader />
  <UserEntryForm v-if="userEntryFormShouldShow" @user-set-success="handleUserSet" />
  <WaitingRoom v-if="waitingRoomShouldShow" :user-id="userID" @talk="connectToRoom" />
  <MeetingPoint v-if="roomID" :room="roomID" />
</template>