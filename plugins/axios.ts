import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {
    axios.defaults.baseURL = process.env.API_BASE_URL;
    axios.defaults.withCredentials = false;
    axios.defaults.proxyHeaders = false;

    if(process.client){
        const token = window.localStorage.getItem('token');
        if(token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }
    return {
        provide: {
            axios: axios
        }
    }
})