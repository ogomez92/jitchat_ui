import { reactive } from 'vue';

interface StateManager {
    disclaimerShouldShow: boolean;
    errorMessage: string | null;
}

export default reactive<StateManager>({
    disclaimerShouldShow: false,
    errorMessage: null,
})
