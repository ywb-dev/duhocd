<script setup>
    import axios from 'axios';
    import { useToast } from 'primevue/usetoast';
    definePageMeta({
        layout: 'custom',
        middleware: 'is-logged-in'
    })

    const { handleSubmit, resetForm } = useForm();
    const { value, errorMessage } = useField('value', validateField);
    const rememberMe = ref(false);
    const username = ref('')
    const router = useRouter()
    const userStore = useUserStore()
    const toast = useToast();

    function validateField(value) {
        if (!value) {
            return 'Password is required.';
        }

        return true;
    }

    const onSubmit = handleSubmit(async(values) => {
        const logged = userStore.login(username, value)
        logged.then(() => {
            if (!userStore.isLoggedIn) {
                toast.add({ severity: 'error', summary: 'Error!', detail: userStore.message, life: 4000 });
                resetForm();
            } else {
                if (userStore.isLoggedIn) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.api_token;
                    router.push('/admin')
                }
            }
        })
    });
</script>
<template>
    <div class="flex flex-col items-center justify-center m-auto ">
        <div class="logo mb-5 flex-shrink-0">
            <IconLogo class="w-[70px]"/>
        </div>
        <div class="rounded-[56px] p-[0.25rem] bg-gradient">
            <div class="box rounded-[56px] px-6 py-16 md:px-14 min-w-[374px] md:min-w-[400px] bg-white">
                <header class="block text-center mb-5 w-full">
                    <h3 class="font-normal text-center text-2xl mb-3 mt-0 text-black">Login</h3>
                    <span class="text-center">Sign in to continue</span>
                </header>
                <div class="card">
                    <form @submit="onSubmit" class="flex flex-col gap-2">
                        <div class="field flex flex-col">
                            <label class="text-sm" for="username">Username</label>
                            <PrimeInputText name="username" id="username" class="border border-border-field w-full rounded px-4 py-2.5 hover:border-primary text-sm text-black" v-model="username" type="text" aria-describedby="text-error" />
                            <small class="p-error" id="text-error"></small>
                        </div>
                        <div class="field flex flex-col">
                            <label class="text-sm" for="pw">Password</label>
                            <PrimePassword :pt="{
                                    input: { class: 'font-normal w-full border border-border-field rounded px-4 py-2.5 text-sm text-black hover:border-primary' },
                                }" id="pw" v-model="value" toggleMask type="text" :class="{ 'p-invalid rounded': errorMessage }" aria-describedby="text-error" />
                            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex align-items-center">
                                <PrimeCheckbox v-model="rememberMe" inputId="rememberMe" name="rememberMe" value="Pepper" 
                                :pt="{
                                    input: () => ({
                                        class: 'border' 
                                    })
                                }"
                                />
                                <label for="rememberMe" class="ml-2 text-sm text-black cursor-pointer select-none"> Remember me </label>
                            </div>
                            <NuxtLink to="/" class="text-sm text-primary font-normal hover:text-primaryHover">
                               forgot password?
                            </NuxtLink>
                        </div>
                        <PrimeButton class="flex cursor-pointer text-center relative items-center overflow-hidden bg-primary text-white text-base rounded px-4 py-2.5 mt-2.5 hover:bg-primaryHover" type="submit" label="Submit" />
                    </form>
                    <PrimeToast />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .p-invalid {
        border: 1px solid red;
    }
    .bg-gradient {
        background: linear-gradient(180deg, #63c2f1 10%, rgba(33, 150, 243, 0) 30%);
    }
</style>
