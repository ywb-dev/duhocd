import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', () => {
    const api_token = ref('');
    const message = ref('');
    const isLoggedIn = ref(false);
    const isUserLoggedIn = ref(false);
    const users = ref([]);
    const tokenCookie = useCookie('token');
    const router = useRouter();

    const processResponse = (response) => response?.data;

    const handleApiError = (error) => {
        console.error('API Error:', error);
    }

    const register = async (formdata) => {
        try {
            const response = await $axios.post('/api/register', formdata);
            return processResponse(response);
        } catch (error) {
            if (error.response && error.response.data) {
                handleApiError(error.response.data);
                return { error: true, status: error.response.status, message: error.response.data.message };
            } else {
                handleApiError(error);
                return { error: true, message: 'An error occurred during registration.' };
            }
        }
    };

    // Admin Login
    const login = async (formdata) => {
        try {
            const response = await $axios.post('/api/user/login', formdata);
            tokenCookie.value =  processResponse(response?.data).api_token;
            api_token.value =  processResponse(response?.data).api_token;
            message.value =  processResponse(response).message;
            isLoggedIn.value =  processResponse(response).success;
        } catch (error) {
            message.value = error?.response?.data?.data?.error || error?.response?.data?.message;
            handleApiError(error);
        }
    }
    // User Login
    const userLogin = async (formdata) => {
        try {
            const response = await $axios.post('/api/login', formdata);
            tokenCookie.value =  processResponse(response?.data).api_token;
            api_token.value =  processResponse(response?.data).api_token;
            message.value =  processResponse(response).message;
            isUserLoggedIn.value =  processResponse(response).success;
        } catch (error) {
            message.value = error?.response?.data?.data?.error || error?.response?.data?.message;
            handleApiError(error);
        }
    }

    const logout = () => {
       return $axios.get('/api/logout')
        .then(() => {
            tokenCookie.value = null;
            resetState();
            alert('Đăng xuất thành công');
            router.push('/admin/login');
        })
    }

    const userLogout = () => {
        return $axios.get('/api/logout')
         .then(() => {
             tokenCookie.value = null;
             resetState();
             alert('Đăng xuất thành công');
             navigateTo('/user/login')
         })
     }

    const resetState = () => {
        message.value = '';
        api_token.value = '';
        isLoggedIn.value = false;
    }

    const getUsers = async () => {
        try {
            const response = await $axios.get(`/api/user`);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const createUser = async (payload) => {
        try {
            const response = await $axios.post('/api/user', payload);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const editUser = async (id, payload) => {
        try {
            const response = await $axios.put(`/api/user/${id}`, payload);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await $axios.delete(`/api/user/${id}`);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const deleteSelectUser = async (payload) => {
        try {
            const response = await $axios.delete('/api/users/delete', {
                data: { user_ids: payload },
            });
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    return { login, userLogin, register, logout, userLogout, message, isLoggedIn, isUserLoggedIn, api_token, getUsers, createUser, editUser, deleteUser, deleteSelectUser }
})