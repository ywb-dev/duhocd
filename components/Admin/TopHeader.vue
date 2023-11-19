<script setup>
    import { ref } from "vue";
    const darkMode = ref(false)
    const menu = ref();
    const items = ref([
        {
            label: 'Theme mode',
            items: [
            ]
        }
    ]);

    const toggle = (event) => {
        menu.value.toggle(event);
    };

    const changeMode = () => {
        const htmlEl = document.getElementsByTagName('html')[0]
        if (darkMode.value) {
            htmlEl.classList.add('dark')
        } else {
            htmlEl.classList.remove('dark')
        }
    }

    const activeSibar = useActive()  
</script>
<template>
    <div class="layout-topbar fixed top-0 left-0 z-[99] h-20 w-full bg-white dark:bg-boxDarkMode header-shadow px-8 
    flex items-center">
        <div class="w-80 flex items-center">
            <a href="#" class="logo block rounded-xl">
                <Logo class="w-14" />
            </a>
        </div>
        <button  @click="activeSibar = !activeSibar" class="flex items-center dark:text-[#fff9]" ><i class="pi text-2xl pi-list p-overlay-badge"></i></button>
        <div class="layout-topbar-menu ml-auto bg-white flex items-center">
            <button 
                v-tooltip.bottom="{
                    value: 'Admin user',
                    text: 'text-xs'
                }" class="mr-4 dark:text-[#fff9]"><i class="pi text-xl pi-user p-overlay-badge"></i></button>
            <button v-tooltip.bottom="'Thông báo!'" class="mr-4 dark:text-[#fff9]"><i v-badge.success="2" class="pi text-xl pi-bell p-overlay-badge"></i></button>
            <div>
                <PrimeButton class="dark:text-[#fff9]" type="button" icon="pi text-xl p-overlay-badge pi-spin pi-cog" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <PrimeMenu ref="menu" id="overlay_menu" :model="items" :popup="true" class="text-xs uppercase text-black my-2.5 font-semibold">
                    <template #end>
                        <div class="flex items-center justify-center">
                            <PrimeInputSwitch @change="changeMode" v-model="darkMode" class=""/>
                            <span class="ml-4 text-black font-light text-sm capitalize">Dark Mode</span>
                        </div>
                    </template>
                </PrimeMenu>
            </div>
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

 button {
    @apply hover:bg-[#f6f9fc] focus:shadow-[inset_0_0_0_1px_#C7D2FE] dark:hover:bg-[#ffffff0a] focus:shadow-[inset_0_0_0_1px_#C7D2FE] hover:bg-[#f6f9fc] dark:focus:shadow-[inset_0_0_0_1px_#e3f3fe];
 }

</style>