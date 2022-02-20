import { defineStore } from "pinia";

export const useMessageStore = defineStore({
    id: 'state',
    state: () => ({
        messages: [] as {
            type: 'message' | 'error',
            text: string,
            routeChanges: number,
            minRouteChanges: number,
        }[],
    }),
    getters: {
        getMessages: (state) => state.messages,
        anyMessages: (state) => state.messages.length > 0,
    },
    actions: {
        addError(text: string, minRouteChanges = 0) {
            this.messages.push({
                type: 'error',
                text,
                routeChanges: 0,
                minRouteChanges: minRouteChanges,
            });
        },
        addMessage(text: string, minRouteChanges = 1) {
            this.messages.push({
                type: 'message',
                text,
                routeChanges: 0,
                minRouteChanges: minRouteChanges,
            });
        },
        clearMessages() {
            this.messages = [];
        },
        clearErrors() {
            this.messages = this.messages.filter(message => message.type !== 'error');
        },
        clearOrIncreaseMessages() {
            this.messages = this.messages
                .filter(message => message.routeChanges < message.minRouteChanges)
                .map(message => {
                    console.log(message);
                    message.routeChanges++
                    return message;
                });
        }
    },
});