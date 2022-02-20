<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import Timeline from '@/components/Timeline.vue';
import LoadingWrapper from '@/components/LoadingWrapper.vue';

import { useMessageStore } from '@/composables/useMessageStore';
import { useUserStore } from '@/composables/useUserStore';
import { useMessages } from '@/composables/useMessages';

import { httpClient } from '@/utils/http-client';

const loading = ref(false);

const { addError, addMessage, clearMessages } = useMessageStore();
const { username, isLoggedIn } = useUserStore();
const { messages, retriveMessages } = useMessages("/msgs", loading);

const form = reactive({
    Content: '',
});
const postMessage = () => {
    loading.value = true;
    clearMessages();

    httpClient.post(`/msgs/${username.value}`, form)
        .then((resp) => {
            if (resp.status === 204) {
                addMessage('Your message was recorded', 0);
                retriveMessages();
            } else {
                addError(resp.data.error);
                loading.value = false;
            }
        })
        .catch((response) => {
            if (response.response) {
                addError(response.response.data.error);
            } else {
                addError(response);
            }

            loading.value = false;
        })
}
</script>

<template>
    <Timeline :messages="messages" title="Public Timeline" :loading="loading">
        <template #twitbox v-if="isLoggedIn">
            <div class="twitbox">
                <h3>What's on your mind {{ username }}?</h3>

                <form @submit.prevent="postMessage" method="post">
                    <p>
                        <input type="text" name="text" size="60" v-model="form.Content" />
                        <button type="submit">Share</button>
                    </p>
                </form>
            </div>
        </template>
    </Timeline>
</template>