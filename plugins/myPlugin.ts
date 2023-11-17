export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            useSidebar: (msg: string) => console.log(`Hello ${msg}`)
        }
    }
})