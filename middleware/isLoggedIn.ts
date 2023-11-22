import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    if (to.fullPath === '/admin/login' && userStore.username) {
        return navigateTo('/admin')
    }
})