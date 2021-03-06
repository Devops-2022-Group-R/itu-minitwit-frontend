<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import Layout from '@/components/Layout.vue';
import { useUserStore } from '@/stores/user';
import { createAuthHeader, httpClient } from '@/utils/http-client';
import LoadingWrapper from '@/components/LoadingWrapper.vue';
import { useMessageStore } from '@/composables/useMessageStore';
import { getLoginHash } from '@/utils/utils';

const router = useRouter();
const userStore = useUserStore();
const { addError, addMessage, clearErrors } = useMessageStore();

const loading = ref(false);

const form = reactive({
    username: '',
    password: '',
});

const login = () => {
    loading.value = true;
    clearErrors();

    httpClient.get('/login', {
        headers: {
            ...createAuthHeader(getLoginHash(form.username, form.password)),
        }
    })
        .then((resp) => {
            if (resp.status === 204) {
                // Save the login information
                userStore.login(form.username, form.password);

                addMessage('You are now logged in!');

                router.push('/');
            } else {
                addError(resp.data.error);
            }
        })
        .catch((response) => {
            if (response.response) {
                addError(response.response.data.error);
            } else {
                addError(response);
            }
        })
        .finally(() => {
            loading.value = false;
        });
}
</script>

<template>
    <Layout title="Sign in">
        <!-- TODO: Replace with real URL -->
        <h2>Sign in</h2>

        <LoadingWrapper :loading="loading">
            <form @submit.prevent="login">
                <dl>
                    <dt>Username:</dt>
                    <dd>
                        <input type="text" name="username" size="30" v-model="form.username" />
                    </dd>

                    <dt>Password:</dt>
                    <dd>
                        <input type="password" name="password" size="30" v-model="form.password" />
                    </dd>
                </dl>

                <div class="actions">
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </LoadingWrapper>
    </Layout>
</template>
