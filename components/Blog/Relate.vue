<template>
    <aside>
        <div id="relate-blog" class="w-full relative md:max-w-[610px] bg-[#E4EFF8] rounded-2xl p-6 mt-5">
            <div class="swiper__wrap">
                <swiper
                    :slidesPerView="1"
                    :spaceBetween="6"
                    :loop="true"
                    :centeredSlides="true"
                    :pagination="{
                    clickable: true,
                    }"
                    :autoplay="{
                        delay: 3000,
                        disableOnInteraction: true,
                    }"
                    :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
                    class="mySwiper"
                >
                    <swiper-slide v-for="blog in latestBlog">
                        <div class="relative">
                            <nuxt-link :to="`/${blog?.category?.slug}/${blog?.slug}`" class="flex select-none relative h-full w-full max-h-[220px] lg:max-h-[220px] max-w-md rounded-2xl overflow-hidden">
                                <div class="box-text flex w-full rounded-xl">
                                    <img width="359" height="125" class="object-cover w-full rounded-2xl overflow-hidden" :src="apiUrl.public.apiBase + blog?.banner" loading="lazy" alt="slider">
                                </div>
                            </nuxt-link>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="w-full mt-8 rounded-xl border border-solid border-textPrimary py-6 px-5 bg-[#EBEBEB]">
                <div class="flex items-end justify-between">
                    <h4 class="text-base flex-1 m-0 text-textPrimary font-bold leading-6 py-1.5 border-b border-solid border-t-0 border-l-0 border-r-0 border-textPrimary">Related Post</h4>
                    <span>
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.069 5.37931C11.069 7.71823 8.97387 9.75862 6.20347 9.75862C3.43306 9.75862 1.33789 7.71823 1.33789 5.37931C1.33789 3.18316 3.18508 1.25021 5.704 1.02241L5.704 6.86186L3.37557 4.53343C3.18031 4.33817 2.86373 4.33817 2.66847 4.53343C2.4732 4.72869 2.4732 5.04528 2.66847 5.24054L5.85045 8.42252C6.04571 8.61778 6.36229 8.61778 6.55755 8.42252L9.73953 5.24054C9.9348 5.04528 9.9348 4.72869 9.73953 4.53343C9.54427 4.33817 9.22769 4.33817 9.03243 4.53343L6.704 6.86186L6.704 1.02251C9.22238 1.25076 11.069 3.18347 11.069 5.37931ZM12.069 5.37931C12.069 8.35022 9.44293 10.7586 6.20347 10.7586C2.964 10.7586 0.337891 8.35022 0.337891 5.37931C0.337891 2.4084 2.964 0 6.20347 0C9.44293 0 12.069 2.4084 12.069 5.37931Z" fill="#1B80CA"/>
                        </svg>
                    </span>
                </div>
                <nuxt-link v-for="blog in latestBlog" :to="`/${blog?.category?.slug}/${blog?.slug}`" class="item-blog w-full flex items-center py-5">
                    <div class="relative overflow-hidden w-9 h-9 mr-2 rounded-full bg-grey-500 border border-solid border-textPrimary">
                        <img width="40" height="40" class="absolute top-0 left-0 object-cover w-full rounded-2xl overflow-hidden" :src="apiUrl.public.apiBase + blog?.banner" loading="lazy" alt="slider">
                    </div>
                    <p class="text-[10px] flex-1 mb-0 text-three-line">
                        {{ blog.title }}
                    </p>
                </nuxt-link>
            </div>
        </div>
    </aside>
</template>
<style>
    #relate-blog .swiper  {
        padding-top: 0;
    }

    #relate-blog .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
    }

    .item-blog {
        border-bottom: 1px solid #849BAC;
     }
    .item-blog:last-child {
        border: 0;
    }
</style>
<script setup>
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';

    const blogStore = useBlogStore()
    const latestBlog = ref([])
    const apiUrl = useRuntimeConfig()

    // get 8 Latest blogs
    const getLatestBlogs = async () => {
        try {
            const res = await blogStore.getLatestBlogs(8);
            latestBlog.value = res;
        } catch (error) {
            console.error('Failed to fetch latest blogs:', error);
        }
    };
   
    onBeforeMount(() => {
        getLatestBlogs();
    })
</script>