<template>
 <main class="relative" >
    <SectionsBlogCarousel/>
    <SectionsNewestBlog/>
    <SectionsNewestBlogText/>
    <div class="bg-image">
        <img class="absolute w-full top-0 left-0 -z-10" src="/image/index-bg.png" alt="bg">
    </div>
    <button @click="goToBlog">Xem Blog</button>
</main>
</template>  
<script setup>
</script>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToBlog = () => {
  router.push('/tech/my-first-blog');
};
</script>