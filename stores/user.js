import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', () => {
    const api_token = ref('')
    const message = ref('')
    const isLoggedIn = ref(false)
    const users = ref([])
    const tokenCookie = useCookie('token')
    const router = useRouter()

    const login = async (formdata) => {
        const response = await $axios.post('/api/login', formdata).then((result) => {
            tokenCookie.value = result?.data?.data?.api_token
            api_token.value = result?.data?.data?.api_token;
            message.value = result?.data?.message;
            isLoggedIn.value = result?.data?.success;
        }).catch(function (errors) {
            message.value = errors?.response?.data?.data?.error || errors?.response?.data?.message;
        })

        return response
    }

    const logout = () => {
       return $axios.get('/api/logout')
        .then(() => {
            tokenCookie.value = null
            resetState()
            alert('Đăng xuất thành công')
            router.push('/admin/login')
        })
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

    const createUser = async (payload) => {
        const users = await $axios.post('/api/user', payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    const editUser = async (id, payload) => {
        const users = await $axios.put(`/api/user/${id}`, payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    const deleteUser = async (id) => {
        const users = await $axios.delete(`/api/user/${id}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    const deleteSelectUser = async (payload) => {
        const users = await $axios.delete('/api/users/delete', {
            data: { user_ids: payload },
        })
        .then((result) => {
            return result?.data?.data
        })
        .catch(function (error) {
            console.log(error);
        });

        return users
    }

    return { login, logout, message, isLoggedIn, api_token, getUsers, createUser, editUser, deleteUser, deleteSelectUser }
})