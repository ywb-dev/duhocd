<template>
     <div>
          <div class="header">
               <AdminTopHeader/>
          </div>
          <main>
              <div class="pt-28">
               <AdminSidebar/>
               <slot />
              </div>
          </main>
     </div>
 </template>