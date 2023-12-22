<template>
    <div v-if="!consentGiven" class="cookie-consent fixed w-full bottom-0 left-0 py-4 lg:px-20 lg:py-6">
      <div class="container flex items-center flex-col lg:flex-row">
        <p class="text-xs text-white font-normal mb-0 mr-2">Chúng tôi sử dụng cookie trên trang web của mình để mang đến cho bạn trải nghiệm phù hợp nhất bằng cách ghi nhớ các tùy chọn của bạn và các lần truy cập lặp lại. Bằng cách nhấp vào “Chấp nhận”, bạn đồng ý với việc sử dụng TẤT CẢ cookie. 
            <nuxt-link class="font-black underline text-white" to="/cookiepolicy">Tìm hiểu thêm</nuxt-link>
        </p>
        <div class="flex mt-4 lg:mt-0">
            <button class="btn-stcookie h-12 mr-2 text-xs font-bold cursor-pointer text-textPrimary px-6 py-1.5 whitespace-nowrap rounded">Setting cookie</button>
            <button class="btn-cookie h-12 text-xs font-bold cursor-pointer text-textPrimary px-6 py-1.5 whitespace-nowrap rounded" @click="acceptCookies">Chấp nhận Cookies</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Cookies from 'js-cookie';
  
  const consentGiven = ref(false);
  
  onMounted(() => {
    consentGiven.value = Cookies.get('cookie-consent') === 'true';
  });
  
  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'true', { expires: 365 });
    consentGiven.value = true;
  };
  </script>
  
  <style scoped>
  .cookie-consent {
    background-color: #0C64A3;
    z-index: 100;
  }
  .btn-cookie {
    background-color: #D9D9D9E5;
    transition: color .3s ease;
    border: 1px solid white;
  }
  .btn-cookie:hover {
    background-color: rgba(217, 217, 217, 0.30);
    color: white;
    border: 1px solid white;
  }

  .btn-stcookie {
    background-color: rgba(217, 217, 217, 0.30);
    color: white;
    border: 1px solid white;
  }
  </style>
  