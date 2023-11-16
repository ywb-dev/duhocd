<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
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

    const itemClick = (event, item) => {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        const { overlayMenuActive, staticMenuMobileActive } = layoutState;

        if ((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value)) {
            onMenuToggle();
        }

        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value;

        setActiveMenuItem(foundItemKey);
    };

    const checkActiveRoute = (item) => {
        return route.path === item.to;
    };
</script>

<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text text-xs uppercase text-black my-2.5 font-semibold">{{ item.label }}</div>
        <NuxtLink to="#" v-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item, index)" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" :to="item.to" class="py-2.5 px-4 flex cursor-pointer rounded-xl hover:bg-[#f6f9fc] focus:shadow-[inset_0_0_0_0.2rem_#C7D2FE] transition-all">
            <i :class="item.icon" class="layout-menuitem-icon w-[18px] mr-1.5"></i>
            <span class="layout-menuitem-text text-black font-light text-sm">{{ item.label }}</span>
            <i class="pi pi-fw pi-sngle-down layout-submenu-toggler w-[18px] mr-1.5" v-if="item.items"></i>
        </NuxtLink >
        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :key="child" :index="i" :item="child" :parentItemKey="itemKey" :root="false"></app-menu-item>
            </ul>
        </Transition>
    </li>
</template>

<style lang="css" >
.layout-submenu .active-menuitem a {
    font-weight: 700;
    color: #6366f1;
}
.layout-submenu .active-menuitem .layout-menuitem-text {
    font-weight: 700;
    color: #6366f1;
}
</style>
