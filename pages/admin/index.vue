<script setup lang="ts">
    import { useToast } from 'primevue/usetoast';
    definePageMeta({
        layout: 'admin',
        middleware: 'is-logged-in'
    });

    const token = useCookie('token')
    const toast = useToast();


    if (token.value) {
        toast.add({ severity: 'success', summary: 'Success!', detail: 'Đăng nhập thành công!', life: 4000 });
    }    
</script>
<template>
        <div>
            <h1 class="dark:text-red-500">Admin123</h1>
            <PrimeToast />
        </div>
</template>
