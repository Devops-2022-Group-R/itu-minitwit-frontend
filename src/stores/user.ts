import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        username: '',
        hash: '',
    }),
    getters: {
        isLoggedIn: (state) => state.hash !== '',
        getUsername: (state) => state.username,
        getHash: (state) => state.hash,
    },
    actions: {
        login(username: string, password: string) {
            this.username = username;
            this.hash = btoa(`${username}:${password}`);
        },
        logout() {
            this.username = '';
            this.hash = '';
        }
    }
})