<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import Timeline from '@/components/Timeline.vue';
import LoadingWrapper from '@/components/LoadingWrapper.vue';

import { useMessageStore } from '@/composables/useMessageStore';
import { useUserStore } from '@/composables/useUserStore';
import { useMessages } from '@/composables/useMessages';

import { httpClient } from '@/utils/http-client';

const loading = ref(false);

const { addError, clearMessages } = useMessageStore();
const { username, isLoggedIn } = useUserStore();
const { messages, retriveMessages } = useMessages("/msgs", loading);

const form = reactive({
    username: username,
    message: '',
});
const addMessage = () => {
    loading.value = true;
    clearMessages();

    httpClient.post('/msgs', form)
        .then((resp) => {
            if (resp.status === 204) {
                retriveMessages();
            } else {
                addError(resp.data.status);
                loading.value = false;
            }
        })
        .catch((response) => {
            if (response.response) {
                addError(response.response.data.status);
            } else {
                addError(response);
            }

            loading.value = false;
        })
}
</script>

<template>
    <LoadingWrapper :loading="loading">
        <Timeline :messages="messages" title="Public Timeline">
            <template #twitbox v-if="isLoggedIn">
                <div class="twitbox">
                    <h3>What's on your mind {{ username }}?</h3>

                    <form @submit.prevent="addMessage" method="post">
                        <p>
                            <input type="text" name="text" size="60" v-model="form.message" />
                            <button type="submit">Share</button>
                        </p>
                    </form>
                </div>
            </template>
        </Timeline>
    </LoadingWrapper>
</template>