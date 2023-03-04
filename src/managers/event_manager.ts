import User from "@src/interfaces/user";
import JitchatAPIService from "@src/services/jitchat_api_service";

export default class EventManager {
    private eventSource: EventSource | undefined;
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    public acceptInvitations = () => {
        console.log('going to accept invitations');
        this.eventSource = JitchatAPIService.getEventSource(this.user);

        this.eventSource.addEventListener('invitation', (event) => {
            console.log('Received invitation event:');
            console.log(event);

            const data = JSON.parse(event.data);
            console.log('Invitation data:');
            console.log(data);
            this.close();
        });

        this.eventSource.onopen = () => {
            console.log('EventSource connection opened.');
        }

        this.eventSource.onerror = (event) => {
            console.log('EventSource error:');
            console.log(event);
            this.close();
        }

        this.eventSource.onmessage = (event) => {
            console.log('EventSource message:');
            console.log(event);
            this.close();
        }
    }

    public close = () => this.eventSource?.close();
}
