<template>
    <NuxtLayout name="404">
      <div class="flex flex-col items-center justify-center mt-8 md:mt-12">
        <div class="text-4xl md:text-6xl font-bold text-textPrimary -tracking-[2px]">Woops!</div>
        <p class="text-center text-xl md:text-2xl font-normal text-textPrimary mt-6 -tracking-[1px]">No content what you’re looking for</p>
        <button class="btn-back font-bold flex items-center text-textPrimary bg-grey-400 pl-12 pr-10 py-2.5 rounded-xl mt-8 md:mt-10 cursor-pointer" @click="goBack">
            <div class="arrow-icon">
                <span class="line"></span>
                <span class="line"></span>
            </div>
            <span class="ml-2.5 text-base font-medium">go back</span>
        </button>
      </div>
    </NuxtLayout>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/')
      }
    }
  }
  </script>
  
  <style scoped>
    .btn-back {
        position: relative;
    }
    .btn-back:hover .arrow-icon {
        width: 30px;
    }
    
    .arrow-icon {
        position: absolute;
        right: 105px;
        height: 2px;
        width: 16px;
        background-color: #1B80CA;
        transition: all 0.4s ease;
    }

    .arrow-icon .line {
        position: absolute;
        display: block;
        height: 2px;
        width: 10px;
        margin-top: 2px;
        background-color: #1B80CA;
        left: 0;
    }

    .arrow-icon .line:nth-child(1) {
        transform: rotate(-45deg);
        top: -5px;
        left: -2px;
    }
    .arrow-icon .line:nth-child(2) {
        transform: rotate(45deg);
        bottom: -3px;
        left: -2px;
    }
  </style>