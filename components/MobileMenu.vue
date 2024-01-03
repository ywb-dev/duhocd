
<template>
    <div class="relative">
        <div class="slideout fixed top-0 right-0 w-full max-w-[320px] bg-[#DBF0FF] min-h-screen z-20">
            <div class="content pt-32">
                <div class="category-wrapper">
                    <PrimeAccordion :activeIndex="0">
                        <PrimeAccordionTab v-for="tab in items" :key="tab.label" :header="tab.label" :pt="{
                            headerIcon: {
                                class: 'hidden'
                            },
                            root: {
                                class: 'bg-transparent'
                            }
                        }">
                            <template v-if="tab?.items?.length">
                                <PrimeAccordion :activeIndex="0">
                                        <PrimeAccordionTab v-for="subtab in tab?.items" :key="subtab.label" :header="subtab.label"
                                        :pt="{
                                            headerIcon: {
                                                class: 'hidden'
                                            },
                                            root: {
                                                class: 'bg-transparent'
                                            }
                                        }"
                                        >
                                            <p v-for="lastsub in subtab.items" class="m-0">{{ lastsub.label }}</p>
                                        </PrimeAccordionTab>
                                </PrimeAccordion>
                            </template>
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

const items = ref([
    {
        label: 'Thông Tin Du Học',
        items: [
            {
                label: 'level-2',
                items: [
                    { label: 'level-3' },
                    { label: 'level-3-1' },
                    { label: 'level-3-1' },
                    { label: 'level-3' },
                ]
            },
            {
                label: 'level-2'
            },
            {
                label: 'level-2'
            }
        ]
    },
    {
        label: 'Yêu cầu tư vấn',
        items: [
            {
                label: 'level-2',
                items: [
                    { label: 'level-3' },
                    { label: 'level-3' },
                    { label: 'level-3-2' },
                    { label: 'level-3-2' },
                ]
            },
            {
                label: 'level-2'
            },
            {
                label: 'level-2'
            }
        ]
    },
    { label: 'Thông Tin Du Học' }
])
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
        width: 100vw;
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