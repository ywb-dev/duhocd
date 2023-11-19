<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
    const activeSibar = useActive()  

    const route = useRoute()
    const { layoutConfig, layoutState, setActiveMenuItem, onMenuToggle } = useLayout();

    const props = defineProps({
    item: {
        type: Object,
        default: () => ({})
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    }
});

const isActiveMenu = ref(false);
const itemKey = ref(null);
    onBeforeMount(() => {
        itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

        const activeItem = layoutState.activeMenuItem;

        isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;
    });

    watch(
        () => layoutConfig.activeMenuItem.value,
        (newVal) => {
            isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
        }
    );

    const checkActiveRoute = (item) => {
        return route.path === item.to;
    };
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text text-xs uppercase text-black dark:text-white my-2.5 font-semibold">{{ item.label }}</div>
        <NuxtLink v-if="item.to && !item.items && item.visible !== false" @click="" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to" class="py-2.5 px-4 flex cursor-pointer rounded-xl hover:bg-[#EBEDF0]  dark:hover:bg-[#ffffff0a] focus:shadow-[inset_0_0_0_0.2rem_#C7D2FE] dark:focus:shadow-[inset_0_0_0_1px_#e3f3fe] transition-all">
            <i :class="item.icon" class="layout-menuitem-icon w-[18px] mr-1.5 dark:text-white"></i>
            <span class="layout-menuitem-text text-black dark:text-white font-light text-sm">{{ item.label }}</span>
            <i class="pi pi-fw pi-sngle-down layout-submenu-toggler w-[18px] mr-1.5 dark:text-white" v-if="item.items"></i>
        </NuxtLink >
        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false"></app-menu-item>
            </ul>
        </Transition>
    </li>
</template>

<style lang="css" >
.layout-submenu .active-menuitem a i,
.layout-submenu .active-menuitem a {
    @apply font-bold text-[#6366f1] dark:!text-[#8dd0ff];
}
.layout-submenu .active-menuitem .layout-menuitem-text {
    @apply font-bold text-[#6366f1] dark:!text-[#8dd0ff];
}
</style>
