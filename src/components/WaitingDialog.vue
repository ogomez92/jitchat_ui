<template>
    <div class="relative bg-blue-200 rounded-md p-4">
        <p role="alert" class="text-blue-800">{{ statusMessage }}</p>
        <button
        ref="cancelButton"
        class="absolute top-2 right-2 text-blue-800 hover:text-blue-600" @click="cancel"
            @keydown.esc.prevent="cancel">
            {{ t('cancelButton') }}
        </button>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
const cancelButton = ref();

const { t } = useI18n({ useScope: 'global' })

defineProps({
    statusMessage: {
        type: String,
        required: true
    }
});
onMounted(() => {
cancelButton.value.focus();

})
const cancel = () => window.location.reload();
</script>