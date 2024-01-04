<template>
   <div class="blog_detail">
      <PagesPageTitle :title="'PostID:' + (blogData.id || 'N/A')" showIconImage="true"/>
      <HeroBanner :blog="blogData" />
      <div class="relative container">
         <div class="layout-sidebar mt-8 flex flex-col md:flex-row">
            <div id="blog-content" class="mb-6 w-full flex-1 rounded-2xl bg-[#F7F7F7] p-6 md:p-9">
                <div class="overflow-x-hidden" v-html="blogData?.content || 'content'">

                </div>
            </div>   
            <div class="sidebar w-full  md:ml-6 md:max-w-[260px]">
               <div class="social__sharing border border-solid border-textPrimary rounded-2xl py-6 px-9 flex gap-5">
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconFacebook/>
                  </nuxt-link>
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconInstagram/>
                  </nuxt-link>
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconSharing/>
                  </nuxt-link>
                  <span class="cursor-pointer flex items-center justify-center hover:opacity-80">
                      <IconCoppy />
                  </span>
                  <span class="cursor-pointer flex items-center justify-center hover:opacity-80">
                     <IconPrint  @click="printContent"/>
                  </span>
               </div>  
               <div class="trends mt-5 w-full p-9 rounded-2xl bg-textPrimary text-white">
                  <h4 class="text-[21px] leading-6 font-bold text-white m-0">Do you like this post?</h4>
                  <p class="m-0 text-[13px] font-normal mt-1.5">Share this in your socials</p>
                  <div class="w-full h-px bg-[#63B9F8] my-6"></div>
                  <h4 class="text-[21px] leading-6 font-bold text-white m-0">Trends</h4>
                  <p class="m-0 text-[13px] font-normal mt-1.5">Do not miss the trends nows</p>
                  <div class="py-6">
                     <NuxtLink to="/" class="flex mb-5 transition-all text-white">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 bg-grey-400 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="" loading="lazy">
                        </div>
                        <span class="ml-3 h-[76px] text-white text-three-line block leading-2">석톤팠운과 싸나의 석톤팠운과 싸나의 석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </NuxtLink>
                     <NuxtLink to="/" class="flex mb-5 transition-all text-white">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 bg-grey-400 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="" loading="lazy">
                        </div>
                        <span class="ml-3 h-[76px] text-white text-three-line block leading-2">석톤팠운과 싸나의 석톤팠운과 싸나의 석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </NuxtLink>
                     <NuxtLink to="/" class="flex mb-5 transition-all text-white">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 bg-grey-400 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="" loading="lazy">
                        </div>
                        <span class="ml-3 h-[76px] text-white text-three-line block leading-2">석톤팠운과 싸나의 석톤팠운과 싸나의 석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </NuxtLink>
                     <NuxtLink to="/" class="flex mb-5 transition-all text-white">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 bg-grey-400 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="" loading="lazy">
                        </div>
                        <span class="ml-3 h-[76px] text-white text-three-line block leading-2">석톤팠운과 싸나의 석톤팠운과 싸나의 석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </NuxtLink>
                     <NuxtLink to="/" class="flex mb-5 transition-all text-white">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 bg-grey-400 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="" loading="lazy">
                        </div>
                        <span class="ml-3 h-[76px] text-white text-three-line block leading-2">석톤팠운과 싸나의 석톤팠운과 싸나의 석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </NuxtLink>
                  </div>
               </div>
            </div>
      </div>
      </div>
   </div>
</template>
<style scoped>
 #blog-content {
   color: black;
 }
 #blog-content .image {
   display: flex;
 }

 #blog-content img {
   width: 100%;
   object-fit: contain;
 }
</style>
<script setup>
const route = useRoute();
const blogStore = useBlogStore();
const blogData = ref({})

// CEO
useSeoMeta({
  title: () => blogData.value?.title,
  ogTitle: () => blogData.value?.title,
  description: () => blogData.value?.description,
  ogDescription: () => blogData.value?.description,
  ogImage: blogData.value?.banner,
})

const categorySlug = route.params.categorySlug;
const blogSlug = route.params.blogSlug;

// Handle print content
const printContent = () => {
  let printContents = document.getElementById('blog-content').innerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
};

// Render blog
const getBlog = async () => {
    try {
        const response = await blogStore.getBlogUi(blogSlug);
        if (response) {
            blogData.value = response;
            console.log('data:', response);
        } else {
            console.error('No data returned from API');
        }
    } catch (error) {
        console.error('API call failed:', error);
    }
};

// Hook
onBeforeMount(() => {
   getBlog()
})
</script>