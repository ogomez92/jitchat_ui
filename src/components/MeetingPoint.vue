<script setup lang="ts">
import { Ref, onBeforeUnmount, ref } from 'vue';
import { useScriptTag } from '@vueuse/core'
import Jitsi from 'jitsi-meet';
import ErrorAlert from './ErrorAlert.vue';
import { useI18n } from 'vue-i18n'
import playSound from '@src/helpers/sound_player';
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
        playSound(doorSlam);
        setTimeout(() => window.location.reload(), 1500);
    });

    jitsiAPI.addListener('videoConferenceLeft', () => {
        playSound(doorSlam);
        setTimeout(() => window.location.reload(), 1500);
    });

    jitsiAPI.addListener('participantLeft', () => {
        playSound(doorSlam);
        setTimeout(() => window.location.reload(), 1500);
    });

    jitsiAPI.addListener('videoConferenceJoined', () => {
        statusMessage.value = t('readyToTalk')
        playSound(connectedSound)
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
            startWithVideoMuted: true,
            DISABLE_VIDEO_BACKGROUND: true,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
            DEFAULT_REMOTE_DISPLAY_NAME: 'JitChat',
            VIDEO_QUALITY_LABEL_DISABLED: true,
            SHOW_CHROME_EXTENSION_BANNER: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            DISABLE_FOCUS_INDICATOR: true,
            DISABLE_PRESENCE_STATUS: true,
            HIDE_DEEP_LINKING_LOGO: true,
            SHOW_POWERED_BY: false,

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