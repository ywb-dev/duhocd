<template>
    <div class="bar_check absolute right-0 -top-3 w-full">
      <div v-for="index in 5" :key="index" :style="barStyle(index)"></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    password: String
  });
  
  const passwordStrength = computed(() => {
    if (!props.password) {
      return 'default'; // Return 'default' when password is empty
    }
  
    const length = props.password.length;
    const hasNumbers = /\d/.test(props.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(props.password);
    const hasLower = /[a-z]/.test(props.password);
    const hasUpper = /[A-Z]/.test(props.password);
    const score = (hasNumbers + hasSpecial + hasLower + hasUpper + (length >= 8));
  
    if (score >= 5 && length >= 10) {
      return 'very_high';
    } else if (score >= 4) {
      return 'high';
    } else if (score >= 3) {
      return 'medium';
    } else if (score >= 2) {
      return 'low';
    } else {
      return 'very_low';
    }
  });
  
  const barStyle = (index) => {
    const strengthLevels = ['default', 'very_low', 'low', 'medium', 'high', 'very_high'];
    const currentLevel = strengthLevels.indexOf(passwordStrength.value) + 1;
  
    let color;
    if (index <= currentLevel && passwordStrength.value !== 'default') {
      switch (index) {
        case 1:
          color = '#EB1818'; // Red
          break;
        case 2:
          color = '#F07319'; // Orange
          break;
        case 3:
          color = '#F3B923'; // Yellow
          break;
        case 4:
          color = '#43DB4A'; // Light Green
          break;
        case 5:
          color = '#2C81E5'; // Blue
          break;
      }
    } else {
      color = '#E4E4E4'; // Default color
    }
  
    return {
      backgroundColor: color,
      position: 'absolute',
      width: '21px',
      height: '6px',
      borderRadius: '3px',
      right: `${(5 - index) * 23}px`,
      top: '0px'
    };
  };
  </script>
  
  <style scoped>
  .bar_check > div {
    position: absolute;
    width: 21px;
    height: 6px;
    border-radius: 3px;
    background-color: #E4E4E4;
  }
  </style>
  