import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        api_token: '',
        isLoggedIn: false,
    }),
    actions: {
        async login(username, password) {
            await $axios.post('/api/admin/login', {
              username: username,
              password: password,
            }).then((result) => {
                localStorage.setItem('token',result.data.data.api_token)
                this.$state.api_token = result.data.data.api_token
                this.$state.username = result.data.data.username
                this.$state.isLoggedIn = true;
            });
        },
        
        async logout() {
            await $axios.post('/api/admin/logout')
            this.resetState()
        },

        resetState() {      
            this.$state.usermame = ''
            this.$state.api_token = ''
            this.$state.isLoggedIn = false
        },
    },
    persist: true,
})