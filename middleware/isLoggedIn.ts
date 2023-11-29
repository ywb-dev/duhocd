import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie('token')
   
    if (to.fullPath === '/admin/login' && token.value) {
        return navigateTo('/admin')
    } else if(to.fullPath === '/admin' && !token.value) {
        return navigateTo('/admin/login')
    }
})