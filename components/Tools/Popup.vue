<template>
    <div class="overlay" v-show="visible" @click="closePopup">
      <div class="popup" @click.stop>
        <button @click="closePopup">Đóng Popup</button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  
    const visible = ref(false);
    const bodyOverflow = ref("auto");
    
    const closePopup = () => {
        visible.value = false;
        bodyOverflow.value = "auto";
    };
    
    onBeforeUnmount(() => {
        bodyOverflow.value = "auto"; 
    });
  
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
  
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    z-index: 1000;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  </style>
  