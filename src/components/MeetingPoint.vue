<script setup lang="ts">
import { Ref, onBeforeUnmount, ref } from 'vue';
import { useScriptTag } from '@vueuse/core'
import Jitsi from 'jitsi-meet';
import ErrorAlert from './ErrorAlert.vue';

const JITSI_API_URL = import.meta.env.VITE_JITSI_INSTANCE
const message = ref('loading');

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
        removeJitsiWidget();
    });

    jitsiAPI.addListener('videoConferenceLeft', () => {
        removeJitsiWidget();
    });

    jitsiAPI.addListener('participantLeft', () => {
        window.location.reload();
    });
}

onBeforeUnmount(() => {
    removeJitsiWidget();
});

const embedJitsiWidget = () => {
    message.value = 'embedding';
    const options = {
        roomName: 'test',
        configOverwrite: {
            prejoinPageEnabled: false,
            startWithVideoMuted: true,
            TOOLBAR_BUTTONS: [],
        },

        width: '100%',
        height: '100%',
        userInfo: {
            displayName: 'My Name'
        },

        parentNode: jitsiContainerRef.value,
    }

    // Get the API from window
    jitsiAPI = new window.JitsiMeetExternalAPI(JITSI_API_URL, options);
    console.log(jitsiAPI);
    message.value = 'embedded';
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
    <p role="alert">
        {{ message }}
    </p>
    <div id="jitsiContainer" ref="jitsiContainerRef" style="height: 100%; width: 100%; position: relative;">
    </div>
    <ErrorAlert v-if="errorToShow" :error-message="errorToShow" />
</template>