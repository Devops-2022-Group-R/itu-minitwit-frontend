<script setup lang="ts">
import type Message from '@/models/message';
import { formatDateTime, getGravatarUrl } from '@/utils/utils';
import { computed } from 'vue';

const props = defineProps<{
    message: Message,
}>();

const username = computed(() => props.message.Author.Username);
const avatar = computed(() => getGravatarUrl(props.message.Author.Email, 48));
const userUrl = computed(() => `/feed/${username.value}`);
const pubDate = computed(() => formatDateTime(props.message.PubDate));
</script>

<template>
    <li>
        <img :src="avatar" />
        <p>
            <strong>
                <router-link :to="userUrl">{{ username }}</router-link>
            </strong>
            {{ message.Text }}
            <small>&mdash; {{ pubDate }}</small>
        </p>
    </li>
</template>