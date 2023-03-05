<script setup lang="ts">
import ErrorAlert from '@src/components/ErrorAlert.vue'
import state_manager from '@src/managers/state_manager';
import { ref, Ref, onMounted } from 'vue';
import EventManager from '@src/managers/event_manager';
import WaitingDialog from '@src/components/WaitingDialog.vue';
import InvitationCard from '@src/components/InvitationCard.vue';
import { useI18n } from 'vue-i18n'
import Invitation      from '@src/interfaces/invitation';
import User from '@src/interfaces/user';
import playSound from '@src/helpers/sound_player';
import InvitationExpiredSound from '@src/assets/invitation_expired.mp3';

const { t } = useI18n({ useScope: 'global' })

let eventManager: EventManager;

const waitingDialogMessage = ref(t('waitingForInvitations'))
const receivedInvitation: Ref<Invitation | null> = ref(null);
const otherUser: Ref<User | null> = ref(null);

const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  eventManager = new EventManager(props.userId);
  eventManager.setInvitationReceivedCallback((invitation) => {

    const theOtherUser = invitation.users.find((user) => user.id !== props.userId);

    if (!theOtherUser) {
      state_manager.errorMessage = `Received invitation with the wrong format, can't find user: ${receivedInvitation.value}`
      return;
    }
    otherUser.value = theOtherUser;
    receivedInvitation.value = invitation
  })

  eventManager.setInvitationExpiredCallback(() => {
    playSound(InvitationExpiredSound);

    otherUser.value = null;
    receivedInvitation.value = null;
  })

  eventManager.acceptInvitations();
});

const acceptInvitation = () => {
  receivedInvitation.value = null;
  waitingDialogMessage.value = t('waitingForOtherUser')
}

const declineInvitation = () => {
  receivedInvitation.value = null;
  waitingDialogMessage.value = t('waitingForInvitations');
}
</script>
<template>        
  <ErrorAlert v-if="state_manager.errorMessage" :error-message="$t('waitingRoomRegistrationError') + state_manager.errorMessage" />
  <WaitingDialog
  v-else-if="!receivedInvitation"
  :status-message="waitingDialogMessage"
  />
  <InvitationCard
  v-if="receivedInvitation && otherUser"
  :name="otherUser?.username"
  :intro="otherUser.intro"
  @accept="acceptInvitation"
  @decline="declineInvitation"
  />
</template>