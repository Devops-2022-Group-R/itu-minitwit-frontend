<script setup lang="ts">
import { useMessageStore } from '@/composables/useMessageStore';
import { useUserStore } from '@/composables/useUserStore';
import { setTitle } from '@/utils/utils';

const props = defineProps<{
    title: string
}>();

setTitle(props.title);

const { username, isLoggedIn } = useUserStore();

const { messages, anyMessages } = useMessageStore();
</script>

<template>
    <div class="page">
        <h1>MiniTwit</h1>

        <div class="navigation">
            <template v-if="isLoggedIn">
                <router-link to="/">my timeline</router-link>|
                <router-link to="/public">my timeline</router-link>|
                <router-link to="/logout">sign out {{ username }}</router-link>
            </template>
            <template v-else>
                <router-link to="/public">public timeline</router-link>|
                <router-link to="/login">login</router-link>|
                <router-link to="/register">register</router-link>
            </template>
        </div>

        <template v-if="anyMessages">
            <ul class="flashes">
                <li v-for="message in messages" :class="message.type">{{ message.text }}</li>
            </ul>
        </template>

        <div class="body">
            <slot />
        </div>

        <div class="footer">MiniTwit &mdash; A Gin/Vue3 Application</div>
    </div>
</template>

<style scoped>
ul.flashes {
    list-style: none;
    margin: 10px 10px 0 10px;
    padding: 0;
}

ul.flashes li {
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    padding: 4px;
    font-size: 13px;
}

ul.flashes li.message {
    background: #b9f3ed;
    border: 1px solid #81cec6;
}

ul.flashes li.error {
    background: #fae4e4;
    border: 1px solid #dd6f6f;
}
</style>