import User from "@src/interfaces/user";
import JitchatAPIService from "@src/services/jitchat_api_service";
import StateManager from '@src/managers/state_manager'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

export default class EventManager {
    private eventSource: EventSource | undefined;
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    public acceptInvitations = () => {
        this.eventSource = JitchatAPIService.getEventSource(this.user);

        this.eventSource.addEventListener('invitation', (event) => {
            console.log(event);
        });

        this.eventSource.onerror = () => {
            StateManager.errorMessage = `${t('waitingRoomRegistrationError')} event server bad response`
            this.close();
        }
    }

    public close = () => this.eventSource?.close();
}
