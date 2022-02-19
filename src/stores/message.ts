import { defineStore } from "pinia";

export const useMessageStore = defineStore({
    id: 'state',
    state: () => ({
        messages: [] as {
            type: 'message' | 'error',
            text: string,
        }[],
    }),
    getters: {
        getMessages: (state) => state.messages,
        anyMessages: (state) => state.messages.length > 0,
    },
    actions: {
        addError(text: string) {
            console.error(text);

            this.messages.push({
                type: 'error',
                text,
            });
        },
        addMessage(text: string) {
            this.messages.push({
                type: 'message',
                text,
            });
        },
        clearMessages() {
            this.messages = [];
        }
    },
});