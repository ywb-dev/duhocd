<template>
    <div class="relative w-full h-7 bg-grey-400 mt-6">
      <div class="container relative">
        <h1 v-show="props.title" class="page_title m-0 text-2xl md:text-[32px] font-black leading-8 text-textPrimary absolute -top-5">{{ props.title }}</h1>
        <div class="relative flex justify-end w-full h-full ">
          <img v-show="props.showIconImage" class="absolute -bottom-7" src="/image/frontend/student-1.png" alt="student">
        </div>
      </div>
  </div>
</template>
<script setup>
  const props = defineProps(['title', 'showIconImage'])
</script>