import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useBlogStore = defineStore('blog', () => {
    
    const getBlogs = async () => {
        const blogs = await $axios.get('/api/blog')
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }

    return { getBlogs }
})