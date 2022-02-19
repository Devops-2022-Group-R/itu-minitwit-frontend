<script setup lang="ts">
const props = defineProps<{
    loading: boolean
}>();
</script>

<template>
    <template v-if="!loading">
        <slot />
    </template>
    <div v-else>Loading, please wait!</div>
    <!-- TODO: Do something nice, like a loading spinner -->
</template>

