import { useMessageStore as store } from '@/stores/message';
import { computed } from 'vue';

export const useMessageStore = () => {
    const messageStore = store();

    const messages = computed(() => messageStore.getMessages);
    const anyMessages = computed(() => messageStore.anyMessages);

    return {
        messages,
        anyMessages,
        addError: messageStore.addError,
        addMessage: messageStore.addMessage,
        clearMessages: messageStore.clearMessages,
        clearErrors: messageStore.clearErrors,
    };
}