<template>
    <section id="hero-banner" class="relative w-full">
        <div class="hero-banner container">
            <div class="relative rounded-b-2xl bg-grey-400 overflow-hidden w-full">
                <div class="box-text w-full h-full flex">
                    <img width="954" class="w-full h-full min-h-[260px] object-cover" src="/banner_demo.png" alt="" loading="eager">
                </div>
                <div class="absolute z-10 px-6 py-4 lg:px-8 lg:py-6 w-full h-full top-0 left-0 flex flex-col justify-end text-white">
                   <div class="flex flex-col">
                    <h1 class="text-3xl lg:text-[46px] lg:leading-5xl mt-0 mb-4">Post Title</h1>
                    <p class="m-0 mb-2 text-[11px] font-medium">meta data</p>
                    <p class="desc text-[11px] leading-4 m-0 text-two-line">래커안애의 묨라델생쩜후다 욱은다 수우에가를 마문게 르님승사를 줍액어의 나와뺄 가클으는 금감어를은 츨헤프굽느니는 앴라넉 곳애궁어서 셇보, 죵삽니다. 개션 두요다 무댠의 구시노읐은 바겻마를 탯으의, 과니면 콘히오아요지어 숨으 데갈좌안이 사잉꼰으로.</p>
                    <div class="tags flex flex-wrap mt-5">
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#3EB121]">tags</span>
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#F15858]">tags</span>
                        <span class="mr-2 py-x px-5 rounded-[6px] flex bg-[#FBE630]">tags</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</template>
<style scoped>
    .box-text::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
        border-radius: 14px;
    }
</style>
<script setup>
 const props = defineProps('tags', 'blog')
</script>