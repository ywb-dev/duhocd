<script setup lang="ts">
    definePageMeta({
        layout: 'custom'
    })
    import { useToast } from 'primevue/usetoast';
    const { handleSubmit, resetForm } = useForm();
    const { value, errorMessage } = useField('value', validateField);
    const { username, userErrorMessage } = useField('username', validateField);
    const toast = useToast();

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
        <div class="logo mb-5 w-[6rem] flex-shrink-0">
            <Logo/>
        </div>
        <div class="box rounded-[56px] px-6 py-16 md:px-16 bg-white">
            <header class="block text-center mb-5 w-full">
                <h3 class="font-normal text-center text-2xl mb-3 text-black">Login</h3>
                <span class="text-center">Sign in to continue</span>
            </header>
            <div class="card flex justify-content-center">
                <form @submit="onSubmit" class="flex flex-column gap-2">
                    <div class="field">
                        <label for="username">Username</label>
                        <PrimeInputText id="username" v-model="username" type="text" :class="{ 'p-invalid': userErrorMessage }" aria-describedby="text-error" />
                        <small class="p-error" id="text-error">{{ userErrorMessage || '&nbsp;' }}</small>
                    </div>
                    <div class="field">
                         <label for="value">Password</label>
                         <PrimePassword id="value" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                    </div>
                    <PrimeButton type="submit" label="Submit" />
                </form>
                <PrimeToast />
            </div>
        </div>
    </div>
</template>
