import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useBlogStore = defineStore('blog', () => {
    const processResponse = (response) => response?.data;

    const handleApiError = (error) => {
        console.error('API Error:', error);
    }

    const getBlog = async (id) => {
        try {
            const response = await $axios.get(`/api/post/${id}`);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    };


    const getBlogs = async (page) => {
        try {
            const response = await $axios.get(`/api/post?page=${page}`);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const createBlog = async (payload) => {
        try {
            const response = await $axios.post('/api/post', payload);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const editBlog = async (id, payload) => {
        try {
            const response = await $axios.put(`/api/post/${id}`, payload);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }


    const deleteBlog = async (id) => {
        try {
            const response = await $axios.delete(`/api/post/${id}`);
            return processResponse(response?.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const getLatestBlogs = async (number) => {
        try {
            const response = await $axios.get(`/api/post/latest/${number}`);
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }


    return { getBlogs, createBlog, getBlog, editBlog, deleteBlog, getLatestBlogs }
})