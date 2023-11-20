<script setup lang="ts">
    definePageMeta({
        layout: 'custom'
    })
    import { useToast } from 'primevue/usetoast';
    const { handleSubmit, resetForm } = useForm();
    const { value, errorMessage } = useField('value', validateField);
    const { username, userErrorMessage } = useField('username', validateField);
    const toast = useToast();
    const rememberMe = ref(false);

    function validateField(value) {
        if (!value) {
            return 'Password is required.';
        }

        return true;
    }

    const onSubmit = handleSubmit((values) => {
        if (values.value && values.value.length > 0) {
            toast.add({ severity: 'info', summary: 'Form Submitted', detail: values.value, life: 3000 });
            resetForm();
        }
    });
</script>
<template>
    <div class="flex flex-col items-center justify-center m-auto ">
        <div class="logo mb-5 flex-shrink-0">
            <Logo class="w-[70px]"/>
        </div>
        <div class="rounded-[56px] p-[0.25rem] bg-gradient">
            <div class="box rounded-[56px] px-6 py-16 md:px-16 bg-white">
                <header class="block text-center mb-5 w-full">
                    <h3 class="font-normal text-center text-2xl mb-3 text-black">Login</h3>
                    <span class="text-center">Sign in to continue</span>
                </header>
                <div class="card flex justify-content-center">
                    <form @submit="onSubmit" class="flex flex-col gap-2">
                        <div class="field flex flex-col">
                            <label class="text-sm" for="username">Username</label>
                            <PrimeInputText id="username" class="border border-border-field rounded px-4 py-2.5 hover:border-primary text-sm text-black" v-model="username" type="text" :class="{ 'p-invalid': userErrorMessage }" aria-describedby="text-error" />
                            <small class="p-error" id="text-error">{{ userErrorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="field flex flex-col">
                            <label class="text-sm" for="value">Password</label>
                            <PrimePassword :pt="{
                                    input: { class: 'font-bold border border-border-field rounded px-4 py-2.5 text-sm text-black' },
                                }" id="value" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                        </div>
                        <div class="flex justify-between">
                            <div class="flex align-items-center">
                                <PrimeCheckbox v-model="rememberMe" inputId="rememberMe" name="rememberMe" value="Pepper" />
                                <label for="rememberMe" class="ml-2"> Remember me </label>
                            </div>
                            <NuxtLink to="/" class="text-sm text-primary font-normal hover:text-primaryHover">
                               forgot password?
                            </NuxtLink>
                        </div>
                        <PrimeButton class="flex cursor-pointer text-center relative items-center overflow-hidden bg-primary text-white text-base rounded px-4 py-2.5 hover:bg-primaryHover" type="submit" label="Submit" />
                    </form>
                    <PrimeToast />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .bg-gradient {
        background: linear-gradient(180deg, #63c2f1 10%, rgba(33, 150, 243, 0) 30%);
    }
</style>
