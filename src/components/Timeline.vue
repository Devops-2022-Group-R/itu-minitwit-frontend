<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import TimelineMessage from '@/components/TimelineMessage.vue';

import type Message from '@/models/message';
import LoadingWrapper from './LoadingWrapper.vue';

const props = defineProps<{
    messages: Message[],
    title: string,
    loading: boolean
}>();
</script>

<template>
    <Layout :title="title">
        <h2>{{ title }}</h2>

        <slot name="twitbox" />

        <slot name="followstatus" />

        <LoadingWrapper :loading="loading">
            <ul class="messages">
                <template v-if="messages.length > 0" v-for="message in messages">
                    <TimelineMessage :message="message" />
                </template>
                <template v-else>
                    <li>
                        <p>No messages so far</p>
                    </li>
                </template>
            </ul>
        </LoadingWrapper>
    </Layout>
</template>