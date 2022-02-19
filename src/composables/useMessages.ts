import { reactive, type Ref } from "vue";
import type { AxiosRequestConfig } from "axios";

import type Message from "@/models/message";
import { httpClient } from "@/utils/http-client";

import { useMessageStore } from "./useMessageStore";

export const useMessages = (url: string, loading: Ref<boolean>, options?: AxiosRequestConfig) => {
    const messages = reactive<Message[]>([]);

    const { addError } = useMessageStore();

    const retriveMessages = () => {
        loading.value = true;

        httpClient.get(url, options)
            .then((resp) => {
                messages.splice(0, messages.length, ...resp.data);
            })
            .catch((response) => {
                addError(response);
            })
            .finally(() => {
                loading.value = false;
            });
    }

    retriveMessages();

    return {
        retriveMessages,
        messages,
    }
}