<template>
    <li class="menu-item block">
        <NuxtLink :class="{ 'root-category tab': isRoot }" class="text-base font-black text-textPrimary py-2.5 px-5 block" :to="index === 0 ? '/admin' : '/admin/login'">{{ item?.label }}</NuxtLink>
        <template v-if="item.items" >
            <ul class="mega-menu-content z-10 pb-5 bg-white">
                <menu-item v-for="subItem in item.items" :key="subItem?.label" :item="subItem"></menu-item>
            </ul>
        </template>
    </li>
</template>
<script>
export default {
  props: {
    item: Object,
    isRoot: Boolean,
    index: Number
  },
};
</script>
<style scoped>
    a:hover {
        text-decoration: none;
    }
    .menu-item a {
        position: relative;
    }
    .menu-item a:hover {
        display: block;
       
    }
    .mega-menu > ul > .menu-item:hover::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 12px;
        bottom: -10px;
        left: 0;
        background-color: transparent;
    }
    .router-link-active.tab::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 12px;
        bottom: -10px;
        left: 0;
        background-color: white;
    }
    .mega-menu-content .menu-item a:hover::before {
        content: '';
        position: absolute;
        height: 8px;
        width: calc(100% - 20px);
        bottom: 10px;
        left: 20px;
        background: linear-gradient(90deg, rgba(86, 171, 233, 0.45) 0%, rgba(86, 171, 233, 0.25) 100%);
    }
    .menu-item .menu-item > a {
        font-size: 14px;
        line-height: 28px;
        font-weight: 700;
        padding: 6px 20px;
    }
    .menu-item .menu-item .menu-item > a {
        font-size: 12px;
        font-weight: 500;
    }
    .menu-item > .root-category + .mega-menu-content {
        transition: all .2s ease-in;
        top: 80px;
        opacity: 0;
        visibility: hidden;
    }
    .menu-item:hover  > .root-category + .mega-menu-content {
        top: 56px;
        visibility: visible;
        opacity: 1;
    }
    .root-category + .mega-menu-content {
        position: absolute;
        width: 100%;
        border: 1px solid #1B80CA;
        border-top: 0;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .root-category + .mega-menu-content > .menu-item > a {
        max-width: 150px;
        border-right: 1px solid #1B80CA;
    }
    .root-category + .mega-menu-content > .menu-item:hover .mega-menu-content {
        opacity: 1;
        visibility: visible;
    }
    .root-category + .mega-menu-content > .menu-item > .mega-menu-content {
        transition: all .3s ease;
        position: absolute;
        left: 150px;
        width: calc(100% - 150px);
        height: 100%;
        top: 0;
        overflow-y: scroll;
        opacity: 0;
        visibility: hidden;
        border-bottom-right-radius: 20px;
    }
    .mega-menu-content::-webkit-scrollbar {
        display: none;
    }
</style>
