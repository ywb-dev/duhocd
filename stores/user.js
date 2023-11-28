import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            api_token: '',
            message: '',
            isLoggedIn: false,
            users: []
        }
    },
    actions: {
        async login(username, password) {
           const response = await $axios.post('/api/login', {
                username: username.value,
                password: password.value,
            }).then((result) => {
                window.localStorage.setItem('token', result?.data?.data?.api_token);
                this.api_token = result?.data?.api_token;
                this.message = result?.data?.message;
                this.isLoggedIn = result?.data?.success;
            }).catch(function (errors) {
                this.message = errors?.response?.data?.data?.error;
            })

            return response
        },
        
        async logout() {
            await $axios.get('/api/logout')
            this.resetState()
        },

        resetState() {      
            this.message = ''
            this.api_token = ''
            this.isLoggedIn = false
        },
        async getUsers() {
           const users = await $axios.get('/api/user')
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

            return users
        }
    },
    persist: true,
})