import { reactive } from 'vue';
import EventManager from '@src/managers/event_manager'

interface StateManager {
    disclaimerShouldShow: boolean;
    eventManager: EventManager | null;
}

export default reactive<StateManager>({
    disclaimerShouldShow: false,
    eventManager: null,
})
