<template>
    <div>
        <div class="header flex justify-center mb-12">
            <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
        </div>
        <div class="flex flex-col">
            <div class="field-fe w-full mb-5">
                <label for="email"></label>
                <input class="input-fe" name="email" id="email" placeholder="Email" type="text">
            </div>
            <div class="field-fe !mb-0 w-full">
                <label for="password"></label>
                <input class="input-fe" name="password" id="password" placeholder="Password" type="text">
            </div>
            <div class="flex justify-center w-full relative mt-8">
                <NuxtLink to="#"
                    class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary">
                </NuxtLink>
                <NuxtLink to="#"
                    class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary">
                </NuxtLink>
                <NuxtLink to="#"
                    class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary">
                </NuxtLink>
            </div>
            <button class="btn-fe">Login</button>
            <div class="flex justify-start items-center mt-3 mb-8">
                <input class="border-primary mr-3 cursor-pointer" type="checkbox" id="rememberme" name="rememberme">
                <label class="text-xs leading-4 text-black cursor-pointer" for="rememberme">Remember me</label>
            </div>
            <div class="w-full h-px bg-grey-500"></div>
            <div class="flex justify-between items-center pt-8 select-none">
                <span class="text-base uppercase font-black text-grey-600">WOOPS!</span>
                <span class="font-medium text-xs text-black">비밀번호가 기억나지 않으세요?</span>
            </div>
            <button @click="visible = true" class="btn-fe !mt-6 ">Reset Password</button>
        </div>
    </div>
    <PrimeDialog v-model:visible="visible" modal :style="{ width: '383px' }"
        :pt="{
            root: { class: 'p-0 rounded-3xl' },
            content: { class: 'p-0 rounded-3xl' },
            header: { class: 'absolute w-4 h-4 flex items-center justify-center bg-transparent right-0' },
            closeButtonIcon: { class: 'rounded-3xl text-white' },
        }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="login-tab flex -mb-5">
            <div
                class="block w-full text-[15px] font-semibold text-black text-center pt-2 pb-6 bg-textPrimary text-white rounded-t-2xl border border-solid border-primary"
               >Reset Password</div>
        </div>
        <div class="relative section-form border border-solid border-primary rounded-3xl bg-[#FAFAFA] pt-12 py-12">
            <div class="form max-w-[282px] px-4 mx-auto">
                <div class="header flex justify-center mb-12">
                    <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
                </div>
                <div class="flex flex-col">
                    <div class="field-fe w-full !mb-0">
                        <label for="email"></label>
                        <input class="input-fe" name="email" id="email" placeholder="Email" type="text">
                    </div>
                    <p class="text-xs font-normal text-black mt-4 text-center">Send me an email to reset my passwords</p>
                    <button class="mx-auto !w-fit !bg-transparent cursor-pointer">
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group 212">
                            <circle id="Ellipse 30" cx="25" cy="25" r="24.5" fill="#D9D9D9" stroke="#1B80CA"/>
                            <path id="Arrow 7" d="M35.7071 25.7071C36.0976 25.3166 36.0976 24.6834 35.7071 24.2929L29.3431 17.9289C28.9526 17.5384 28.3195 17.5384 27.9289 17.9289C27.5384 18.3195 27.5384 18.9526 27.9289 19.3431L33.5858 25L27.9289 30.6569C27.5384 31.0474 27.5384 31.6805 27.9289 32.0711C28.3195 32.4616 28.9526 32.4616 29.3431 32.0711L35.7071 25.7071ZM17 26H35V24H17V26Z" fill="#1B80CA"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </PrimeDialog>
</template>
<script setup>
definePageMeta({
    layout: 'login'
});

const visible = ref(false);
</script>