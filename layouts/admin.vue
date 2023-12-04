<script setup>
   const activeSibar = useActive()  
</script>
<template>
     <div class="bg-white dark:bg-bgDarkMode min-h-screen">
          <div class="header">
               <AdminTopHeader/>
          </div>
          <main>
              <div class="pt-28 px-8 ">
               <AdminSidebar/>
               <div :class="activeSibar ? 'lg:ml-0': 'lg:ml-80 lg:pl-8'" class="px-0 transition-all">
                    <slot />
               </div>
              </div>
          </main>
     </div>
 </template>