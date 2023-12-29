<template>
    <div class="loading z-[999] fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div class="loading__inner">
            <span class="loader"></span>
        </div>
    </div>
</template>
<style scoped>
    .loading {
        background-color: rgba(0, 0, 0, 0.2);
    }
    .loader {
        width: 60px;
        height: 60px;
        border: 4px dotted #FFF;
        border-style: solid solid dotted dotted;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        animation: rotation 2s linear infinite;
        }
        .loader::after {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 4px dotted #FF3D00;
        border-style: solid solid dotted;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        animation: rotationBack 1s linear infinite;
        transform-origin: center center;
        }
            
        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        } 
        @keyframes rotationBack {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
        } 
</style>
<script setup>
</script>