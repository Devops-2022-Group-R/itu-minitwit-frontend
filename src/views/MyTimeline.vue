<script setup lang="ts">
import { useMessages } from "@/composables/useMessages";
import { useUserStore } from "@/composables/useUserStore";
import { createAuthHeader } from "@/utils/http-client";
import { ref } from "vue";

import LoadingWrapper from "../components/LoadingWrapper.vue";
import Timeline from "../components/Timeline.vue";

const { hash } = useUserStore();

const loading = ref(false);

const { messages } = useMessages("/feed", loading, {
    headers: {
        ...createAuthHeader(hash.value)
    }
});
</script>

<template>
    <Timeline :messages="messages" title="My Timeline" :loading="loading">
        <template #followstatus>
            <div class="followstatus">This is you!</div>
        </template>
    </Timeline>
</template>