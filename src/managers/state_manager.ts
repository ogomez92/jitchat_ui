import { reactive } from 'vue';
import User from '@src/interfaces/user';

interface StateManager {
disclaimerShouldShow: boolean;
currentUser: User | null,

}

export default reactive<StateManager>({
disclaimerShouldShow: false,

})
