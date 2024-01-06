<template>
   <div class="blog_detail">
      <PagesPageTitle :title="'PostID:' + (blogData.id || 'N/A')" showIconImage="true"/>
      <HeroBanner :blog="blogData" />
      <div class="relative container">
         <div class="layout-sidebar mt-5 py-8 flex flex-col md:flex-row">
           <div class="max-w-[670px] w-full">
               <div class="blog-desc w-full p-8 mb-5 bg-[#DAEFFF] rounded-2xl flex items-center">
                  <p class="text-sm text-black leading-[21px] -tracking-[0.3px] mb-0">{{ blogData?.description }}</p>
               </div>
               <div id="blog-content" class="w-full flex-1 rounded-2xl bg-[#F7F7F7] p-6 md:p-9">
                  <div  ref="textToCopy" class="overflow-x-hidden w-full" v-html="blogData?.content || 'content'">

                  </div>
                  <div class="comment w-full">
                     <div class="list-comment mt-12 mb-10">
                        <h4 class="text-black mt-0 font-medium text-[15px]">0 comments</h4>
                     </div>
                     <div class="w-full h-px bg-[#DEDEDE]"></div>
                     <div class="box-comment w-full flex pt-5">
                        <div class="avatar w-14 h-14 mr-2.5 rounded-full bg-grey-500 relative"></div>
                        <div class="flex-1">
                           <textarea class="w-full h-14 rounded border-textPrimary px-2.5 py-2 text-[13px] text-black" name="" id="" cols="30" rows="10" placeholder="Add a comment"></textarea>
                        </div>
                     </div>
                  </div>
               </div> 
           </div>  
            <div class="sidebar w-full h-fit md:ml-6 md:max-w-[260px] md:sticky top-0">
               <div class="social__sharing flex justify-center items-center border border-solid border-textPrimary rounded-2xl py-6 px-9 flex gap-5">
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconFacebook/>
                  </nuxt-link>
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconInstagram/>
                  </nuxt-link>
                  <nuxt-link class="flex items-center justify-center hover:opacity-80" to="/">
                     <IconSharing/>
                  </nuxt-link>
                  <span @click="copyText" class="cursor-pointer flex items-center justify-center hover:opacity-80">
                      <IconCoppy />
                  </span>
                  <span class="cursor-pointer flex items-center justify-center hover:opacity-80">
                     <IconPrint  @click="printContent"/>
                  </span>
               </div>  
               <BlogTrends/>
               <BlogRelate/>
            </div>
      </div>
      </div>
   </div>
</template>
<style>
 #blog-content {
   color: black;
   min-height: 600px;
 }


 #blog-content th,
 #blog-content td,
 #blog-content table {
   border: 1px solid #1B80CA;
   border-collapse: collapse;
 }

 #blog-content th,
 #blog-content td {
   padding: 7px 15px;
   text-align: center;
 }
 
 #blog-content .image {
   display: inline-block;
   margin: 0 auto 20px;
 }

 #blog-content .image img {
   width: 100%;
   object-fit: cover;
 }

 #blog-content .table {
   margin-left: 0;
   margin-right: 0;
}

 @media (max-width: 767px)  {

   #blog-content img {
      object-position: center;
   }
   
   #blog-content .image img {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: contain;
   }
 }

</style>
<script setup>
const route = useRoute();
const blogStore = useBlogStore();
const blogData = ref({});
const textToCopy = ref('')

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

// Handle coppy content
const copyText = () => {
   if (textToCopy.value) {
      const text = textToCopy.value.innerText;
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      alert('Nội dung đã được sao chép!');
   }
}

// Render blog
const getBlog = async () => {
    try {
        const response = await blogStore.getBlogUi(blogSlug);
   
        if (response) {
            blogData.value = response;
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