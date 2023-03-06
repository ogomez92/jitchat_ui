import JitchatAPIService from "@src/services/jitchat_api_service";
import EndpointError from "@src/enums/endpoint_error";
import StateManager from '@src/managers/state_manager'
import Invitation from "@src/interfaces/invitation";
import EventType from "@src/enums/event_type";

export default class EventManager {
    private eventSource: EventSource | undefined;
    private invitationReceivedCallback: ((invitation: Invitation) => void) | undefined;
    private invitationExpiredCallback: (() => void) | undefined;
    private talkTimeCallback: ((roomID: string) => void) | undefined;
    private userID: string;

    constructor(userID: string) {
        this.userID = userID;
    }

    public setInvitationReceivedCallback = (callback: (invitation: Invitation) => void) => {
        this.invitationReceivedCallback = callback;
    }

    public setInvitationExpiredCallback = (callback: () => void) => {
        this.invitationExpiredCallback = callback;
    }

    public setTalkTimeCallback = (callback: (roomID: string) => void) => {
        this.talkTimeCallback = callback;
    }

    public acceptInvitations = () => {
        if (!this.invitationReceivedCallback || !this.invitationExpiredCallback || !this.talkTimeCallback) {
            throw new Error(`Cannot accept invitations with unset callbacks`);
            return;
        }

        this.eventSource = JitchatAPIService.getEventSource(this.userID);

        this.eventSource.addEventListener(EventType.INVITATION, (event) => {
            if (event.data && this.invitationReceivedCallback) {
                this.invitationReceivedCallback(JSON.parse(event.data) as Invitation);
            }
        });

        this.eventSource.addEventListener(EventType.INVITATION_EXPIRED, () => {
            if (this.invitationExpiredCallback) {
                this.invitationExpiredCallback();
            }
        });

        this.eventSource.addEventListener(EventType.TALK_TIME, (event) => {
            if (this.talkTimeCallback) {
                this.talkTimeCallback(event.data);
            }
        });

        this.eventSource.onerror = () => {
            StateManager.errorMessage = EndpointError.EVENT_SERVER_ERROR;
            this.close();
        }
    }

    public close = () => this.eventSource?.close();
}
