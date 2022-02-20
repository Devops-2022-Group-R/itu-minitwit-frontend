<script setup lang="ts">
import { useMessages } from "@/composables/useMessages";
import { ref } from "vue";
import { useRoute } from "vue-router";

import Timeline from "../components/Timeline.vue";
import Follow from "../components/Follow.vue";

const route = useRoute();

const loading = ref(false);

const user = route.params.username as string;
const { messages } = useMessages(`/msgs/${user}`, loading);
</script>

<template>
    <Timeline :messages="messages" :title="`${user}'s Timeline`" :loading="loading">
        <template #followstatus>
            <Follow :toFollow="user" />
        </template>
    </Timeline>
</template>