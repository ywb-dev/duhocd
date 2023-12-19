import axios from "axios"

export default defineNuxtPlugin(nuxtApp => {
    axios.defaults.baseURL = 'https://api.duhocd.com';
    axios.defaults.withCredentials = false;
    // axios.defaults.proxyHeaders = false;

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