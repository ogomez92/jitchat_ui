<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'
import User from '@src/interfaces/user';
import UserService from '@src/services/user_service';
import InputValidator from '@src/helpers/input_validator'

const { t } = useI18n({ useScope: 'global' })
const userFromServer: Ref<User | null> = ref(null);
let nameField = ref('');
let introField = ref('');

let nameError = ref(false);
let introError = ref(false);

onMounted(async () => {
    userFromServer.value = await UserService.getExistingUser();

    if (userFromServer.value) {
        nameField.value = userFromServer.value.username;
        introField.value = userFromServer.value.intro
    }
})

const submitForm = async () => {
    nameError.value = !InputValidator.isNameValid(nameField.value);
    introError.value = !InputValidator.isIntroValid(introField.value);

    if (nameError.value || introError.value) {
        return;
    }

    let user: User = {
        username: nameField.value,
        intro: introField.value,
        id: userFromServer.value?.id || null,
    }
}

</script>

<template>
    <div class="max-w-md mx-auto mt-4">
        <div v-if="userFromServer" role="alert" class="bg-green-100 text-green-800 p-2 rounded shadow-sm" >
    {{ t('userFormDataFound') }}
  </div>
        <form @submit.prevent="submitForm">
            <div class="mb-4">
                <label for="name" class="block text-gray-700 font-bold mb-2"> {{  t('userFormName') }}</label>
                <input
                id="name" v-model="nameField" :class="{ 'border-red-500': nameError }" type="text" autofocus
                    class="form-input mt-1 block w-full" required>
                <span v-if="nameError" role="alert" class="text-red-500 text-xs italic">{{  $t('userFormNameError') }}</span>
            </div>

            <div class="mb-4">
                <label for="intro" class="block text-gray-700 font-bold mb-2"> {{  t('userFormIntro') }}</label>
                <textarea 
                id="intro" v-model="introField" :class="{ 'border-red-500': introError }"
                    class="form-textarea mt-1 block w-full" required></textarea>
                <span v-if="introError" role="alert" class="text-red-500 text-xs italic">{{  $t('userFormIntroError') }}</span>
            </div>
            <div class="mt-6">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {{  t('userFormEnter') }}
                </button>
            </div>
        </form>
    </div>
</template>