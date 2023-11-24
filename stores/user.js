import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        MediaSession: '',
        api_token: '',
        message: '',
        isLoggedIn: false,
    }),
    actions: {
        async login(username, password) {
            await $axios.post('/api/admin/login', {
              username: username.value,
              password: password.value,
            }).then((result) => {
                window.localStorage.setItem('token', result?.data?.api_token);
                this.$state.api_token = result?.data?.api_token
                this.$state.message = result?.data?.message
                this.$state.isLoggedIn = true;
            });
        },
        
        async logout() {
            await $axios.post('/api/admin/logout')
            this.resetState()
        },

        resetState() {      
            this.$state.message = ''
            this.$state.api_token = ''
            this.$state.isLoggedIn = false
        },
    },
    persist: true,
})