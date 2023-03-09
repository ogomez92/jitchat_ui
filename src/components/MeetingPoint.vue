<script setup lang="ts">
import { Ref, onBeforeUnmount, ref } from 'vue';
import { useScriptTag } from '@vueuse/core'
import Jitsi from 'jitsi-meet';
import ErrorAlert from './ErrorAlert.vue';
import { useI18n } from 'vue-i18n'
import playSound from '@src/helpers/sound_player';
import connectedParticipantSound from '@src/assets/connected_participant.mp3';
import connectedSound from '@src/assets/connected.mp3';
import doorSlam from '@src/assets/doorslam.mp3';

const { t } = useI18n({ useScope: 'global' })

const JITSI_API_URL = import.meta.env.VITE_JITSI_INSTANCE

const statusMessage = ref('');

const jitsiContainerRef: Ref<HTMLDivElement | null> = ref(null);

useScriptTag(`${JITSI_API_URL}/external_api.js`, () => {
    console.log('jitsi loaded!');
    embedJitsiWidget();
    registerEvents();
});

const errorToShow = ref('');

let jitsiAPI: Jitsi.JitsiMeetExternalAPI;
const props = defineProps({
    room: {
        type: String,
        required: true
    }
});

const registerEvents = () => {
    jitsiAPI.addListener('readyToClose', () => {
        setTimeout(() => window.location.reload(), 1500);
    });

    jitsiAPI.addListener('participantLeft', () => {
        playSound(doorSlam);
        setTimeout(() => window.location.reload(), 1500);
    });

    jitsiAPI.addListener('videoConferenceJoined', () => {
        playSound(connectedSound)
    });

    jitsiAPI.addListener('participantJoined', () => {
        statusMessage.value = t('readyToTalk')
        playSound(connectedParticipantSound)
    });

}

onBeforeUnmount(() => {
    removeJitsiWidget();
});

const embedJitsiWidget = () => {
    const options = {
        // Disallow video
        roomName: props.room,
        configOverwrite: {
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            startWithVideoMuted: true,
            disableVideoBackground: true,
            DisableDominantSpeakerIndicator: true,
            defaultRemoteDisplayName: 'JitChat',
            videoQualityLabelDisabled: true,
            showChromeExtensionBanner: false,
            showBrandWatermark: false,
            showJitsiWatermark: false,
            disableJoinLeaveNotifications: true,
            disableFocusIndicator: true,
            disablePresenceStatus: true,
            hideDeepLinkingLogo: true,
            showPoweredBy: false,
        },
        interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
                'microphone', 'closedcaptions', 'desktop',
                'hangup', 'chat',
                'settings',
            ]
        },
        width: '100%',
        height: '100%',
        userInfo: {
            displayName: 'My Name'
        },

        parentNode: jitsiContainerRef.value,
    }
    jitsiAPI = new (window as any).JitsiMeetExternalAPI(JITSI_API_URL.replace('https://', ''), options);
};

/* const executeCommand = (command: Jitsi.ExternalAPICommands, ...value: any) => {
    jitsiAPI.executeCommand(command, ...value);
}; */
// Listen for events


const removeJitsiWidget = () => {
    if (jitsiAPI) jitsiAPI.dispose();
}
</script>

<template>
    <div id="jitsiContainer" ref="jitsiContainerRef" style="height: 100%; width: 100%; position: relative;">
    </div>
    <ErrorAlert v-if="errorToShow" :error-message="errorToShow" />
    <div role="alert" class="bg-green-500 text-white px-4 py-2 rounded-md">
        {{ statusMessage }}
    </div>
</template>