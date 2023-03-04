import JitchatAPIService from "@src/services/jitchat_api_service";
import EndpointError from "@src/enums/endpoint_error";
import StateManager from '@src/managers/state_manager'
import Invitation from "@src/interfaces/invitation";
import EventType from "@src/enums/event_type";

export default class EventManager {
    private eventSource: EventSource | undefined;
    private invitationReceivedCallback: ((invitation: Invitation) => void) | undefined;
    private userID: string;

    constructor(userID: string) {
        this.userID = userID;
    }

    public setInvitationReceivedCallback = (callback: (invitation: Invitation) => void) => {
        this.invitationReceivedCallback = callback;
    }

    public acceptInvitations = () => {
        if (!this.invitationReceivedCallback) {
            throw new Error(`Cannot accept invitations with no callback specified`);
            return;
        }

        this.eventSource = JitchatAPIService.getEventSource(this.userID);

        this.eventSource.addEventListener(EventType.INVITATION, (event) => {
            if (event.data && this.invitationReceivedCallback) {
                this.invitationReceivedCallback(event.data as Invitation);
            }
        });

        this.eventSource.onerror = () => {
            StateManager.errorMessage = EndpointError.EVENT_SERVER_ERROR;
            this.close();
        }
    }

    public close = () => this.eventSource?.close();
}
