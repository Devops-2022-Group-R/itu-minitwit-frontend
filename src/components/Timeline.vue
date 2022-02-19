<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import TimelineMessage from '@/components/TimelineMessage.vue';

import type Message from '@/models/message';

const props = defineProps<{
    messages: Message[],
    title: string,
}>();
</script>

<template>
    <Layout :title="title">
        <h2>{{ title }}</h2>

        <slot name="twitbox" />

        <div class="followstatus" v-if="$slots.followstatus">
            <slot name="followstatus" />
        </div>

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
    </Layout>
</template>