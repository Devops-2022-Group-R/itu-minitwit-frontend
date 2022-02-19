<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import Layout from '@/components/Layout.vue';
import { httpClient } from '@/utils/http-client';
import { useMessageStore } from '@/composables/useMessageStore';


const router = useRouter();
const { addError, addMessage, clearErrors } = useMessageStore();

const loading = ref(false);

const form = reactive({
    username: '',
    email: '',
    pwd: '',
    pwd2: '',
});

const register = () => {
    loading.value = true;
    clearErrors();

    httpClient.post('/register', form)
        .then((resp) => {
            if (resp.status === 204) {
                addMessage('You are now registered!');
                router.push('/login');
            } else {
                addError(resp.data.status);
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
    <Layout title="Sign up">
        <!-- TODO: Replace with real URL -->
        <h2>Sign Up</h2>

        <LoadingWrapper :loading="loading">
            <form @submit.prevent="register">
                <dl>
                    <dt>Username:</dt>
                    <dd>
                        <input type="text" name="username" size="30" v-model="form.username" />
                    </dd>
                    <dt>Email:</dt>
                    <dd>
                        <input type="text" name="email" size="30" v-model="form.email" />
                    </dd>
                    <dt>Password:</dt>
                    <dd>
                        <input type="password" name="password" size="30" v-model="form.pwd" />
                    </dd>
                    <dt>Confirm Password:</dt>
                    <dd>
                        <input type="password" name="password2" size="30" v-model="form.pwd2" />
                    </dd>
                </dl>
                <button type="submit">Sign Up</button>
            </form>
        </LoadingWrapper>
    </Layout>
</template>


