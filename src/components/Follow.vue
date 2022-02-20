<script setup lang="ts">
import { onMounted, ref } from "vue";

import { createAuthHeader, httpClient } from "@/utils/http-client";

import { useMessageStore } from "@/composables/useMessageStore";
import { useUserStore } from "@/composables/useUserStore";
import LoadingWrapper from "./LoadingWrapper.vue";

const props = defineProps<{
    toFollow: string
}>();

const loading = ref(false);

const { username, hash, isLoggedIn } = useUserStore();
const { addError } = useMessageStore();
const isFollowing = ref(false);

const getIsfollowing = () => {
    httpClient.get(`/fllws/${username.value}`)
        .then(res => {
            const follows: string[] = res.data.follows;

            isFollowing.value = follows.find(f => f === props.toFollow) !== undefined;
        })
        .catch(err => {
            addError(err); // TODO: handle error
        });
}

const options = {
    headers: {
        ...createAuthHeader(hash.value)
    }
};

const follow = () => {
    httpClient.post(`/fllws/${username.value}`, { "follow": props.toFollow }, options)
        .then(() => {
            isFollowing.value = true;
        })
        .catch(err => {
            addError(err); // TODO: handle error
        });
}

const unfollow = () => {
    httpClient.post(`/fllws/${username.value}`, { "unfollow": props.toFollow }, options)
        .then(() => {
            isFollowing.value = false;
        })
        .catch(err => {
            addError(err); // TODO: handle error
        });
}

onMounted(() => {
    if (isLoggedIn.value) {
        getIsfollowing();
    }
});
</script>

<template>
    <template v-if="isLoggedIn">
        <div class="followstatus">
            <LoadingWrapper :loading="loading">
                <template v-if="isFollowing">
                    You are currently following this user.
                    <a
                        class="unfollow"
                        @click="unfollow"
                    >Unfollow user</a>.
                </template>

                <template v-else>
                    You are not yet following this user.
                    <a
                        class="follow"
                        @click="follow"
                    >Follow user</a>.
                </template>
            </LoadingWrapper>
        </div>
    </template>
</template>