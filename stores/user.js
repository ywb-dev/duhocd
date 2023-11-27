import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        MediaSession: '',
        api_token: '',
        message: '',
        isLoggedIn: false,
        users: []
    }),
    actions: {
        async login(username, password) {
            await $axios.post('/api/login', {
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
            await $axios.post('/api/logout')
            this.resetState()
        },

        resetState() {      
            this.$state.message = ''
            this.$state.api_token = ''
            this.$state.isLoggedIn = false
        },
        async getUsers() {
           const users = await $axios.get('/api/users')
            .then((result) => {
                return result?.data
            })
            .catch(function (error) {
                console.log(error);
            });

            return users
        }
    },
    persist: true,
})