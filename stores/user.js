import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', () => {
    const api_token = ref('')
    const message = ref('')
    const isLoggedIn = ref(false)
    const users = ref([])
    const tokenCookie = useCookie('token')

    const login = async (username, password) => {
        const response = await $axios.post('/api/login', {
            username: username.value,
            password: password.value,
        }).then((result) => {
            tokenCookie.value = result?.data?.data?.api_token
            api_token.value = result?.data?.data?.api_token;
            message.value = result?.data?.message;
            isLoggedIn.value = result?.data?.success;
        }).catch(function (errors) {
            message.value = errors?.response?.data?.data?.error;
        })

        return response
    }

    const logout = () => {
        $axios.get('/api/logout')
        resetState()
    }

    const resetState = () => {
        message.value = ''
        api_token.value = ''
        isLoggedIn.value = false
    }

    const getUsers = async () => {
        const users = await $axios.get('/api/user')
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    return { login, logout, getUsers, message, isLoggedIn, api_token }
})