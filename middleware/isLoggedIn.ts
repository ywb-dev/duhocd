import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    console.log('userStore:', userStore.message);
    
    if (to.fullPath === '/admin/login' && userStore.username) {
        return navigateTo('/admin')
    }
})