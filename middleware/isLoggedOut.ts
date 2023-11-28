export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    if (!userStore.username) {
        return navigateTo('/login')
    }
})