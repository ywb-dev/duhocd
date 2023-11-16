<script setup>
    const { onMenuToggle } = useLayout();
    console.log('meu:', onMenuToggle);
</script>
<template>
    <div class="layout-topbar fixed top-0 left-0 z-[999] h-20 w-full bg-white header-shadow px-8 
    flex items-center">
        <a href="#" class="logo block w-80 flex items-center rounded-xl">
            <Logo class="w-14" />
        </a>
        <button @click="onMenuToggle()"><i class="pi text-2xl pi-list p-overlay-badge"></i></button>
        <div class="layout-topbar-menu ml-auto bg-white flex items-center">
            <button v-tooltip.bottom="{
                value: 'Admin user',
                text: 'text-xs'
            }" class="mr-4"><i class="pi text-xl pi-user p-overlay-badge"></i></button>
            <button v-tooltip.bottom="'Thông báo!'" class="mr-4"><i v-badge.success="2" class="pi text-xl pi-bell p-overlay-badge"></i></button>
            <button class=""><i class="pi pi-spin text-xl pi-cog p-overlay-badge"></i></button>
        </div>
    </div>
</template>
<style scoped>
 .header-shadow {
    box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
 }
 button {
    padding: 6px 10px;
    border-radius: 9px;
    height: fit-content;
 }
 button:hover {
    background-color: #f6f9fc;
 }
 
</style>