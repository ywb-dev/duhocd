import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useBlogStore = defineStore('blog', () => {

    const getBlog = async (id) => {
        const blogs = await $axios.get(`/api/post/${id}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }
    
    const getBlogs = async (page) => {
        const blogs = await $axios.get(`/api/post?page=${page}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }

    const createBlog = async (payload) => {
        const blogs = await $axios.post('/api/post', payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }

    const editBlog = async (id, payload) => {
        const blogs = await $axios.put(`/api/post/${id}`, payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }

    
    const deleteBlog = async (id) => {
        const blogs = await $axios.delete(`/api/post/${id}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return blogs
    }

    return { getBlogs, createBlog, getBlog, editBlog, deleteBlog }
})