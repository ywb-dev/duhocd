<template>
    <footer>
        <div class="relative w-full bg-bgDark ">
            <div class="footer__inner">
                <div class="container py-8 md:py-0">
                    <div class="grid md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                        <div class="flex flex-col justify-between w-full px-2 py-4 md:py-8">
                            <div>
                                <a class="block mb-4" href="#">
                                    <IconFooterLogo class="w-30"></IconFooterLogo>
                                </a>
                            </div>
                            <div>
                                <p><a href="#">202 2F, 19, Yanghwa-ro 15an-gil,
                                Mapo-gu, Seoul, Republic of Korea</a></p>
                                <p><a href="tel:418-81-56683">Business Registration No. 418-81-56683</a></p>
                            </div>
                        </div>
                        <div class="flex flex-col w-full px-2 py-4 md:py-8">
                            <h4 class="m-0 lg:mb-6">Support</h4>
                            <ul class="p-0">
                                <li class="block"><a class="text-white font-normal text-[10px] tracking-[0.45px]" href="mailto:duhocd@yeowubie.com">email: duhocd@yeowubie.com</a></li>
                            </ul>
                        </div>
                        <div class="flex flex-col w-full px-2 py-4 md:py-8">
                            <h4 class="m-0 lg:mb-6">Company</h4>
                            <ul class="p-0">
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="/blog">About us</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">Contact</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">Privacy Policy</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">Service Plicy</NuxtLink></li>
                            </ul>
                        </div>
                        <div class="flex flex-col w-full px-2 py-4 md:py-8">
                            <h4 class="m-0 lg:mb-6">Quick Menu</h4>
                            <ul class="p-0">
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">FAQ</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">QnA</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">Request Quotation</NuxtLink></li>
                                <li class="block"><NuxtLink class="text-white py-2 block font-normal text-[10px] tracking-[0.45px]" to="#">Document Download</NuxtLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="devider"></div>
                <div class="container flex justify-end pt-8 pb-10">
                    <span class="text-ss text-white font-normal tracking-[0.88px]">@2023 All rights Reserved. </span>
                </div>
            </div>
        </div>
    </footer>
</template>
<style scoped>
.devider {
    height: 2px;
    background-color: black;
    width: 100%;
}

h4 {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    letter-spacing: 1.3px;
}

p > a {
    font-size: 9px;
    color: #fff;
    font-weight: 300;
    word-wrap: break-word;
}
</style>