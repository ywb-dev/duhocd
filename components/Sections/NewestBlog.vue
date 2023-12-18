 <template>
    <section class="relative newset__blog">
        <div class="newsest__innder container">
            <div class="pt-8 md:pt-16">
                <TitleSection heading="Thông Tin Du Học Mới Nhất" link="#"/>
                <div class="flex flex-col md:flex-row justify-between pt-6 md:pt-12 pb-12 md:pb-16">
                    <NuxtLink to="/" class="left-banner min-h-[327px] overflow-hidden flex-1 bg-grey-400 rounded-2xl md:mr-5 border border-solid border-textPrimary mb-5 md:mb-0">
                        <img class="w-full h-full object-cover" width="548" height="327" src="" alt="Banner Post ">
                    </NuxtLink>
                    <div class="right-context md:max-w-[388px] w-full">
                        <PrimeAccordion :activeIndex="0">
                            <PrimeAccordionTab
                            :pt="{
                                headerIcon: { class: 'hidden'},
                                headerAction: { class: 'bg-transparent border-0 p-0'},
                                content: { class: 'p-0 border-0 text-sm font-normal text-black'}
                            }"
                            >
                                <template #header>
                                    <div class="banner_thump w-full h-20 rounded-2xl border border-solid border-textPrimary bg-grey-400 mb-2.5 overfow-hidden">
                                        <img width="388" class="object-cover" height="76px" src="" alt="thumbpost">
                                    </div>
                                </template>
                                <p class="text-sm font-normal text-black mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis aliquam malesuada bibendum arcu</p>
                            </PrimeAccordionTab>
                            <PrimeAccordionTab
                            :pt="{
                                headerIcon: { class: 'hidden'},
                                headerAction: { class: 'bg-transparent border-0 p-0'},
                                content: { class: 'p-0 border-0 text-sm font-normal text-black'}
                            }"
                            >
                                <template #header>
                                    <div class="banner_thump w-full h-20 rounded-2xl border border-solid border-textPrimary bg-grey-400 mb-2.5 overfow-hidden">
                                        <img width="388" class="object-cover" height="76px" src="" alt="thumbpost">
                                    </div>
                                </template>
                                <p class="text-sm font-normal text-black mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis aliquam malesuada bibendum arcu</p>
                            </PrimeAccordionTab>
                            <PrimeAccordionTab
                            :pt="{
                                headerIcon: { class: 'hidden'},
                                headerAction: { class: 'bg-transparent border-0 p-0'},
                                content: { class: 'p-0 border-0 text-sm font-normal text-black'}
                            }"
                            >
                                <template #header>
                                    <div class="banner_thump w-full h-20 rounded-2xl border border-solid border-textPrimary bg-grey-400 mb-2.5 overfow-hidden">
                                        <img width="388" class="object-cover" height="76px" src="" alt="thumbpost">
                                    </div>
                                </template>
                                <p class="text-sm font-normal text-black mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis aliquam malesuada bibendum arcu</p>
                            </PrimeAccordionTab>
                        </PrimeAccordion>
                    </div>
                </div>
            </div>
        </div>
    </section>
 </template>