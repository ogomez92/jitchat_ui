import { reactive } from 'vue';

interface StateManager {
    disclaimerShouldShow: boolean;
}

export default reactive<StateManager>({
    disclaimerShouldShow: false,

})
