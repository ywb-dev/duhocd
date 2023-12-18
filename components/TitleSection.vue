<template>
    <div class="title__wrap flex flex-col md:flex-row justify-between">
        <h3 class="tab text-base md:text-[21px] leading-[22px] font-black text-textPrimary m-0 pt-4 px-8">{{ props.heading }}</h3>
        <div class="md:border-b md:border-solid flex-1 border-t-0 border-l-0 border-r-0 md:border-textPrimary flex mt-[26px] md:mt-0 md:justify-end">
            <NuxtLink v-show="props.link" :to="props.link" class="more-content text-textPrimary flex items-center justify-center">
                <span class="icon flex">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.5" stroke="#1B80CA"/>
                    <path d="M13.3536 8.35355C13.5488 8.15829 13.5488 7.84171 13.3536 7.64645L10.1716 4.46447C9.97631 4.2692 9.65973 4.2692 9.46447 4.46447C9.2692 4.65973 9.2692 4.97631 9.46447 5.17157L12.2929 8L9.46447 10.8284C9.2692 11.0237 9.2692 11.3403 9.46447 11.5355C9.65973 11.7308 9.97631 11.7308 10.1716 11.5355L13.3536 8.35355ZM1 8.5L13 8.5L13 7.5L1 7.5L1 8.5Z" fill="#1B80CA"/>
                    </svg>
                </span>
                <span class="text ml-1 text-xs font-medium text-textPrimary">
                    more contents
                </span>
            </NuxtLink>
        </div>
    </div>
</template>
<script setup>
    const props = defineProps(['heading', 'link'])
</script>