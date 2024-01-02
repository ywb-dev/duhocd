<template>
   <div class="blog_detail">
      <PagesPageTitle title="PostId" showIconImage="true"/>
      <HeroBanner/>
      <div class="relative container">
         <div class="layout-sidebar mt-8 flex flex-col md:flex-row">
            <div class="content w-full flex-1 rounded-2xl bg-[#F7F7F7] p-6 md:p-9">
            
            </div>   
            <div class="sidebar w-full  md:ml-6 md:max-w-[310px]">
               <div class="social__sharing border border-solid border-textPrimary rounded-2xl py-6 px-9 flex gap-[30px]">
                  <IconFacebook/>
                  <IconInstagram/>
                  <IconSharing/>
                  <IconCoppy/>
                  <IconPrint/>
               </div>  
               <div class="trends mt-5 w-full p-9 rounded-2xl bg-textPrimary text-white">
                  <h4 class="text-[21px] leading-6 font-bold text-white m-0">Do you like this post?</h4>
                  <p class="m-0 text-[13px] font-normal mt-1.5">Share this in your socials</p>
                  <div class="w-full h-px bg-[#63B9F8] my-6"></div>
                  <h4 class="text-[21px] leading-6 font-bold text-white m-0">Trends</h4>
                  <p class="m-0 text-[13px] font-normal mt-1.5">Do not miss the trends nows</p>
                  <div class="py-6">
                     <div class="flex mb-5">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="">
                        </div>
                        <span class="ml-3">석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </div>
                     <div class="flex mb-5">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="">
                        </div>
                        <span class="ml-3">석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </div>
                     <div class="flex mb-5">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="">
                        </div>
                        <span class="ml-3">석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </div>
                     <div class="flex mb-5">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="">
                        </div>
                        <span class="ml-3">석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </div>
                     <div class="flex mb-5">
                        <div class="flex rounded-xl overflow-hidden w-20 h-20 min-w-[80px]">
                           <img width="80" height="80" class="w-full h-full object-cover" src="/banner_demo.png" alt="">
                        </div>
                        <span class="ml-3">석톤팠운과 싸나의, 어흥지존는 맵열끼까지 셔저다</span>
                     </div>
                  </div>
               </div>
            </div>
      </div>
      </div>
   </div>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const categorySlug = route.params.categorySlug;
const blogSlug = route.params.blogSlug;
</script>
