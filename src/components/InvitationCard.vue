<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import playSound from '@src/helpers/sound_player';
import IncomingInvitationSound from '@src/assets/invitation.mp3';


const emits = defineEmits(['accept', 'decline']);

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    }
});

const invitationTextarea = ref();
const invitationText = `${t('invitationCardTitleWithName')} ${props.name}

${props.intro}

${t('invitationCardExplanation')}
`

onMounted(() => {
    playSound(IncomingInvitationSound);
    invitationTextarea.value.focus();
    invitationTextarea.value.setSelectionRange(0, 0);
})
</script>
<template>
    <div class="bg-white p-8 rounded-md shadow-md">
        <h2 role="alert" class="text-4xl font-bold text-center mb-6">{{ `${t('invitationCardTitleWithName')} ${props.name}`
        }}</h2>
        <form>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="invitationCardTextarea">{{
                    t('invitationCardTextareaLabel') }}</label>
                <textarea
                id="invitationCardTextarea" ref="invitationTextarea" v-model="invitationText" class="w-full p-3 border rounded-md"
                    :name="t('invitationCardTitleWithName')" rows="3" autofocus>
                                            </textarea>
            </div>
            <div class="flex justify-center">
                <button
                type="button"
                @click="emits('accept')"
                >{{ t('invitationCardButtonYes') }}</button>
                <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mr-4"
                type="button" @click="emits('decline')"
                        > {{ t('invitationCardButtonNo') }}</button>

            </div>
        </form>
    </div>
</template>
<style scoped>
.bg-white {
    background-color: #fff;
}

.p-8 {
    padding: 2rem;
}

.rounded-md {
    border-radius: 0.375rem;
}

.shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
}

.font-bold {
    font-weight: 700;
}

.text-center {
    text-align: center;
}

.mb-6 {
    margin-bottom: 1.5rem;
}

.mb-4 {
    margin-bottom: 1rem;
}

.block {
    display: block;
}

.text-gray-700 {
    color: #4a5568;
}

.font-bold {
    font-weight: 700;
}

.w-full {
    width: 100%;
}

.border {
    border-width: 1px;
}

.p-3 {
    padding: 0.75rem;
}

.flex {
    display: flex;
}

.justify-center {
    justify-content: center;
}

.bg-red-500 {
    background-color: #f56565;
}

.hover\:bg-red-700:hover {
    background-color: #c53030;
}

.text-white {
    color: #fff;
}

.py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.rounded-md {
    border-radius: 0.375rem;
}

.mr-4 {
    margin-right: 1rem;
}

.bg-green-500 {
    background-color: #48bb78;
}

.hover\:bg-green-700:hover {
    background-color: #2f855a;
}
</style>
  