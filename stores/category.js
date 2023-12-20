import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useCategoryStore = defineStore('category', () => {
    const processResponse = (response) => response?.data?.data;

    const handleApiError = (error) => {
        console.error('API Error:', error);
    }
    
    const getCategories = async () => {
        try {
            const response = await $axios.get('/api/category');
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }

    const createCategory = async (payload) => {
        try {
            const response = await $axios.post('/api/category', payload);
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }

    const editCategory = async (id, payload) => {
        try {
            const response = await $axios.put(`/api/category/${id}`, payload);
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }

    const deleteCategory = async (id) => {
        try {
            const response = await $axios.delete(`/api/category/${id}`);
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }

    const deleteSelectCategory = async (payload) => {
        try {
            const response = await $axios.delete('/api/categories/delete', {
                data: { category_ids: payload },
            });
            return processResponse(response);
        } catch (error) {
            handleApiError(error);
        }
    }

    return { getCategories, createCategory, editCategory, deleteCategory, deleteSelectCategory }
})