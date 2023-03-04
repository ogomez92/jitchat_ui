<script setup lang="ts">
import ErrorAlert from '@src/components/ErrorAlert.vue'
import state_manager from '@src/managers/state_manager';
import { ref, onMounted } from 'vue';
import EventManager from '@src/managers/event_manager';
import WaitingDialog from '@src/components/WaitingDialog.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

let eventManager: EventManager;

const invitationAvailable = ref(null);

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  eventManager = new EventManager(props.userId);
  eventManager.setInvitationReceivedCallback((invitation) => {
    console.log(invitation);
  })
  eventManager.acceptInvitations();
  console.log('listening for events')
});
</script>
<template>
  <ErrorAlert v-if="state_manager.errorMessage" :error-message="$t('waitingRoomRegistrationError') + state_manager.errorMessage" />
  <WaitingDialog
  v-else-if="!invitationAvailable"
  :status-message="t('waitingForInvitations')"
  />
</template>