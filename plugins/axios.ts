import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    axios.defaults.withCredentials = false;
    axios.defaults.proxyHeaders = false;

    if(process.client){
        const token = useCookie('token').value;
        
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