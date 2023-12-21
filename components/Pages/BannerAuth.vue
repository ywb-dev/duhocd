<template>
    <div id="banner-auth" class="relative container">
        <div :class="props?.bgColor" class="relative my-8 lg:mb-16 flex w-full rounded-2xl overflow-hidden px-10 md:px-20 pt-8 pb-28 md:py-10">
            <h3 class="text-auth-banner font-bold leading-[56px] text-3xl lg:text-[52px] m-0">{{ props?.title }}</h3>
            <img :src="props?.image" :width="props?.width" :height="props?.height" class="object-cover absolute bottom-0 right-10" alt="student"/>
        </div>
    </div>
</template>
<script setup>
  const props = defineProps(['title', 'image' , 'bgColor', 'width', 'height'])
</script>
<style scoped>
    .text-auth-banner {
        color: rgba(255, 255, 255, 0.45);
    }
</style>