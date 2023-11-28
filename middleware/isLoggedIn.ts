export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
   
    if (to.fullPath === '/login' && userStore.username) {
        return navigateTo('/admin')
    }
})