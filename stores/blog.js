import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useBlogStore = defineStore('blog', () => {

    const getBlog = async (id) => {
        const blogs = await $axios.get(`/api/blog/${id}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }
    
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

    const createBlog = async (payload) => {
        const users = await $axios.post('/api/blog', payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    const editBlog = async (id, payload) => {
        const users = await $axios.put(`/api/blog/${id}`, payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return users
    }

    return { getBlogs, createBlog, getBlog, editBlog }
})