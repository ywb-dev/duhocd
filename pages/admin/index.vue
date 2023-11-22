<script setup lang="ts">
    definePageMeta({
    layout: 'admin'
    })

    const isLogged = ref(true)

    if (!isLogged.value) {
        await navigateTo('/admin/login')
    }

</script>
<template>
    <div >
        <h1 class="dark:text-red-500">Admin123</h1>
    </div>
</template>