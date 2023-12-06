import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useCategoryStore = defineStore('category', () => {
    
    const getBlogs = async () => {
        const users = await $axios.get('/api/blog')
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

})