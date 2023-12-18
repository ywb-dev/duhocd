<script setup>
    import { ref } from "vue";

    definePageMeta({
        middleware: 'is-logged-out'
    })

    const darkMode = ref(false)
    const menu = ref();
    const accountMenu = ref();
    const sibaricon = ref()
    const items = ref([
        {
            label: 'Theme mode',
            items: [
            ]
        }
    ]);

    const accountItems = ref([
        {
            label: 'Account Actions',
            items: [
            ]
        }
    ]);

    const toggle = (event) => {
        menu.value.toggle(event);
    };

    const accountToggle = (event) => {
        accountMenu.value.toggle(event);
    };

    const userStore = useUserStore()
    
    const changeMode = () => {
        const htmlEl = document.getElementsByTagName('html')[0]
        if (darkMode.value) {
            htmlEl.classList.add('dark')
        } else {
            htmlEl.classList.remove('dark')
        }
    }

    const logout = () => {
        userStore.logout()
    }

    const activeSibar = useActive() 
    const toggleActive = () => {
        activeSibar.value = !activeSibar.value;
    };
</script>
<template>
    <div class="layout-topbar fixed top-0 left-0 z-[99] h-20 w-full bg-white dark:bg-boxDarkMode header-shadow px-8 
    flex items-center">
        <div class="w-80 flex items-center">
            <a href="#" class="logo block rounded-xl">
                <IconLogo class="w-14" />
            </a>
        </div>
        <div class="flex cursor-pointer items-center dark:bg-transparent dark:text-[#fff9] mr-4" >
            <div @click="toggleActive" :class="{ 'active': activeSibar }" class="icon">
                <div class="bar"></div>
                <div class="bar mdl"></div>
                <div class="bar"></div>
            </div>
        </div>
        <div class="layout-topbar-menu ml-auto flex items-center">
            <div>
                <PrimeButton
                :pt="{ 
                    icon: { class: 'text-[#000] dark:text-white' } 
                }"
                class="bg-[#efefef] dark:text-[#fff9] mr-4 dark:bg-transparent" type="button" icon="pi text-xl pi-user p-overlay-badge" @click="accountToggle" aria-haspopup="true" aria-controls="overlay_menu_account" />
                <PrimeMenu ref="accountMenu" id="overlay_menu_account" :model="accountItems" :popup="true" class="text-xs uppercase text-black my-2.5 font-semibold">
                    <template #end>
                        <div class="flex px-4 items-center cursor-pointer hover:bg-[#efefef]" @click="logout">
                            <PrimeButton type="button" icon="pi pi-sign-out" class="bg-transparent text-black"/>
                            <span class="text-black text-sm capitalize font-semibold">Logout</span>
                        </div>
                    </template>
                </PrimeMenu>
            </div>
            <button v-tooltip.bottom="'Thông báo!'" class="mr-4 cursor-pointer dark:bg-transparent dark:text-[#fff9]"><i v-badge.warning="2" class="pi text-xl pi-bell p-overlay-badge"></i></button>
            <div>
                <PrimeButton
                :pt="{ 
                    icon: { class: 'text-[#000] dark:text-white' } 
                }"
                class="bg-transparent dark:text-[#fff9]" type="button" icon="pi text-xl p-overlay-badge pi-spin pi-cog" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
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
 
 /* Sidebar icon amimate */
 .icon {
  width: 30px;
  height:30px;
  position: relative;
  align-items: center;
  cursor:pointer;
  transition:300ms all ease-in-out;
  -webkit-transition-duration: 300ms; /* Safari */
  margin-left:6px;
  top: 4px;
  border-radius: 10px;
}

.icon.active {
    top: 0;
}

.icon::after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 10px #67a9e7;
}

.icon:active::after {
  box-shadow: 0 0 0 0 #67a9e7;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top:0;
  opacity: 1;
  transition: 0s;
}

.icon:active{
    top: 1px;
}

.icon .bar{
  border-radius:1000px;
  background: #67a9e7;
  width:26px;
  height: 3px;
  margin:0px 2px;
  position: relative;
  transition:300ms all ease-in-out;
}
.dark .icon .bar{
    background-color: white;
}

.icon .bar:first-child{top: 0;}
.icon .bar:nth-child(2){top: 6px;}
.icon .bar:last-child{top:12px;}

.icon.active .mdl {
    opacity: 0;
}

.icon.active .bar:first-child{transform:rotate(45deg);top:16px;}
.icon.active .bar:last-child{transform:rotate(-45deg);top:10px;}
</style>