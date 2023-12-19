<script setup>
const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin' }]
    },
    {
        label: 'Admin control',
        items: [
            { label: 'Users Management', icon: 'pi pi-fw pi-id-card', to: '/admin/users' },
            { label: 'Categories', icon: 'pi pi-fw pi-list', to: '/admin/categories' },
            { label: 'Blog posts', icon: 'pi pi-fw pi-check-square', to: '/admin/blogs' },
        ]
    },  
     {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: 'https://www.landing.duhocd.com/'
            }
        ]
     }
]);
const activeSibar = useActive()  
</script>
<template>
    <div :class="activeSibar ? 'translate-x-0 lg:-translate-x-[110%] lg:left-0' : '-translate-x-full lg:translate-x-0'" class="layout-sidebar fixed left-0 top-0 lg:top-auto lg:left-auto w-80 z-100 h-full lg:max-h-[80vh] z-[999] lg:z-10 overflow-y-auto transition-all duration-300 bg-[#fff] px-6 py-2 rounded-xl dark:bg-boxDarkMode">
        <ul class="layout-menu m-0 p-0">
            <ul class="layout-menu">
                <template v-for="(item, i) in model" :key="item">
                    <AdminAppMenuItem v-if="!item.separator" :item="item" :index="i"/>
                    <li v-if="item.separator" class="menu-separator"></li>
                </template>
            </ul>
        </ul>
    </div>
    <div @click="activeSibar = !activeSibar" :class="activeSibar ? 'fixed' : ''" class="overlay top-0 left-0 right-0 bottom-0 z-40 bg-[#000] opacity-40 lg:hidden"></div>
</template>
<style scoped>
    .layout-sidebar {
        box-shadow: 0 3px 5px #00000005, 0 0 2px #0000000d, 0 1px 4px #00000014;
    }
</style>