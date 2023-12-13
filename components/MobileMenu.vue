
<template>
    <div class="relative">
        <div class="slideout fixed top-0 right-0 w-full max-w-[320px] bg-[#DBF0FF] min-h-screen z-10">
            <div class="content pt-32">
                <div class="category-wrapper">
                    <PrimeAccordion :activeIndex="0">
                        <PrimeAccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
                            <p class="m-0">{{ tab.content }}</p>
                            <PrimeAccordion :activeIndex="0">
                                <PrimeAccordionTab v-for="tab in tabs" :key="tab.title" :header="tab.title">
                                    <p class="m-0">{{ tab.content }}</p>
                                </PrimeAccordionTab>
                            </PrimeAccordion>
                        </PrimeAccordionTab>
                    </PrimeAccordion>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref([
    { title: 'Title 1', content: 'Content 1' },
    { title: 'Title 2', content: 'Content 2' },
    { title: 'Title 3', content: 'Content 3' }
]);
</script>
<style scoped>
    .slideout {
        transform: translateX(100%);
        opacity: 0;
        transition: transform 0.4s, opacity 0.4s;
    } 
    .slideout::before {
        content: '';
        position: absolute;
        right: 100%;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(16px);
        visibility: hidden;
    }

    .navopen .slideout {
        transform: translateX(0);
        opacity: 1;
    }

    .navopen .slideout::before {
        visibility: visible;
    }
</style>