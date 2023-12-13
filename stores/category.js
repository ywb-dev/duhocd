import axios from "~/plugins/axios";
import { defineStore } from "pinia";

const $axios = axios().provide.axios;

export const useCategoryStore = defineStore('category', () => {
    
    const getCategories = async () => {
        const categories = await $axios.get('/api/category')
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return categories
    }

    const createCategory = async (payload) => {
        const categories = await $axios.post('/api/category', payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return categories
    }

    const editCategory = async (id, payload) => {
        const categories = await $axios.put(`/api/category/${id}`, payload)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return categories
    }

    const deleteCategory = async (id) => {
        const categories = await $axios.delete(`/api/category/${id}`)
            .then((result) => {
                return result?.data?.data
            })
            .catch(function (error) {
                console.log(error);
            });

        return categories
    }

    const deleteSelectCategory = async (payload) => {
        const categories = await $axios.delete('/api/categories/delete', {
            data: { category_ids: payload },
        })
        .then((result) => {
            return result?.data?.data
        })
        .catch(function (error) {
            console.log(error);
        });

        return categories
    }

    return { getCategories, createCategory, editCategory, deleteCategory, deleteSelectCategory }
})