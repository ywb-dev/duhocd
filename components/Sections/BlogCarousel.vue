<template>
    <section>
        <div class="swiper__wrap">
            <swiper
                :slidesPerView="1.2"
                :spaceBetween="10"
                :loop="true"
                :centeredSlides="true"
                :pagination="{
                clickable: true,
                }"
                :autoplay="{
                    delay: 4000,
                    disableOnInteraction: true,
                }"
                :breakpoints="{
                '640': {
                    slidesPerView: 2.5,
                    spaceBetween: 12,
                },
                '768': {
                    slidesPerView: 2.5,
                    spaceBetween: 12,
                },
                '1024': {
                    slidesPerView: 3.4,
                    spaceBetween: 12,
                },
                '1441': {
                    slidesPerView: 4.4,
                    spaceBetween: 24,
                },
                }"
                :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
                class="mySwiper"
            >
                <swiper-slide v-for=" tab in 8">
                    <div class="relative">
                        <nuxt-link class="flex relative h-full w-full max-h-[220px] lg:max-h-[220px] max-w-md rounded-2xl overflow-hidden border border-solid border-textPrimary p-2.5" to="/">

                            <img width="359" height="185" class="object-cover w-full rounded-2xl overflow-hidden" src="/image/slider1.png" loading="lazy" alt="slider">
                            <div class="flex flex-col justify-end text-left absolute z-50 w-full h-full top-0 left-0 p-10">
                                <div class="ml-6">
                                    <h3 class="text-[21px] text-white font-black m-0">Post Title</h3>
                                    <p class="text-white text-[11px] font-medium">Post description</p>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>
<script setup>
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';

</script>
<style>
    .swiper  {
        padding-top: 16px;
        padding-bottom: 32px;
    }

    .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background-color: #d9d9d9;
        border: 1px solid #1B80CA;
    }
   
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: #FBE630;
    }

    .swiper-pagination-bullet:hover {
        background-color: #FBE630;
        opacity: 1;
    }

    .swiper .swiper-pagination {
        bottom: 2px;
    }

    @media  (max-width: 1023px) {
        .swiper  {
            padding: 16px 0 32px 0;
        }

        .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
        }
    }   
</style>