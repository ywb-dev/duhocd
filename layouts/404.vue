<script lang="ts" setup></script>

<template>
  <Header />
  <div class="pt-[155px]">
    <PagesPageTitle/>
    <div class="w-full max-w-[460px] m-auto flex flex-col min-h-[80vh] justify-center items-center">
      <h2 class="text-8xl md:text-[140px] font-black text-grey-400 m-0 text-center">404</h2>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
