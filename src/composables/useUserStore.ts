import { useUserStore as store } from "@/stores/user";
import { computed } from "vue";

export function useUserStore() {
    const userStore = store();

    const isLoggedIn = computed(() => userStore.isLoggedIn);
    const username = computed(() => userStore.getUsername);
    const hash = computed(() => userStore.getHash)

    return {
        isLoggedIn,
        username,
        hash
    };
}