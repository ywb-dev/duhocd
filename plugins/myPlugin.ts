export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            useLayout: (msg: string) => console.log(`Hello ${msg}`)
        }
    }
})