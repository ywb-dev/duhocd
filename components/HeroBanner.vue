<template>
    <section id="hero-banner" class="relative w-full">
        <div class="hero-banner !px-0 lg:!px-4 container">
            <div v-show="!imageLoaded" class="card">
                <div class="rounded-b-2xl overflow-hidden w-full">
                    <PrimeSkeleton width="100%" height="250px"></PrimeSkeleton>
                </div>
            </div>
            <div  v-show="imageLoaded" class="relative rounded-b-2xl bg-grey-400 overflow-hidden w-full">
                <div class="box-text-img w-full h-full flex">
                    <img width="954" :src="imageSrc" @load="onImageLoad"  class="w-full h-full min-h-[260px] object-cover md:max-h-[260px]" :alt="props?.blog?.slug" loading="eager">
                </div>
                <div class="absolute z-10 px-6 py-4 lg:px-8 lg:py-6 w-full h-full top-0 left-0 flex flex-col justify-end text-white">
                   <div class="flex flex-col">
                    <h1 class="text-xl md:text-[32px] leading-6 md:leading-9 mt-0 mb-4">{{ props?.blog?.title || 'Post Title' }}</h1>
                    <p class="m-0 mb-2 text-[11px] font-medium">{{ props?.blog?.formatted_created_at }}</p>
                  
                    <div class="tags flex flex-wrap mt-9">
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#3EB121]">tags</span>
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#F15858]">tags</span>
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#FBE630]">tags</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>
<style scoped>
    .box-text-img::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
    }
</style>
<script setup>
    const props = defineProps(['blog'])
    const apiUrl = useRuntimeConfig()
    const imageLoaded = ref(false);

    const onImageLoad = () => {
    imageLoaded.value = true;
    };

    const imageSrc = computed(() => apiUrl?.public?.apiBase + props?.blog?.banner);
</script>