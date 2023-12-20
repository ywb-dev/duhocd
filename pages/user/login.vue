<template>
    <div id="login" class="relative login-page">
        <PagesPageTitle title="Login"/>

        <div class="container relative">
            <div class="section-form border border-solid border-primary rounded-3xl bg-[#FAFAFA] pt-20 py-16">
                <div class="form max-w-[282px] mx-auto">
                    <div>
                        <div class="header flex justify-center mb-12">
                            <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
                        </div>
                        <div class="flex flex-col">
                            <div class="field w-full mb-5">
                                <label for="email"></label>
                                <input class="" name="email" id="email" placeholder="Email" type="text">
                            </div>
                            <div class="field !mb-0 w-full">
                                <label for="password"></label>
                                <input class="" name="password" id="password" placeholder="Password" type="text">
                            </div>
                            <div class="flex justify-center w-full relative mt-8">
                                <NuxtLink to="#" class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary"></NuxtLink>
                                <NuxtLink to="#" class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary"></NuxtLink>
                                <NuxtLink to="#" class="w-11 h-11 mx-4 flex items-center justify-center hover:no-underline rounded-full overflow-hidden bg-[#EDEDED] border border-solid border-[#D0D0D0] hover:border-primary"></NuxtLink>
                            </div>
                            <button class="">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="mt-10 py-6 md:py-10 px-8 md:px-16 flex flex-col md:flex-row justify-between bg-grey-500 gap-6">
                <p class="text-xl font-medium text-black md:pr-12">Bạn đang tuyển sinh viên quốc tế tại Hàn Quốc?
                    Đăng ký làm thành viên du học tại <a class="underline" href="https://www.duhocd.com/">DUHOCD.com</a>,
                    Quảng bá sản phẩm của bạn tới sinh viên Việt Nam.</p>
                <button class="max-w-32 lg:max-w-56">Register</button>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
    input {
        border-radius: 7px;
        width: 100%;
        padding: 7px 16px;
        background: #EDEDED; 
        border-radius: 7px; 
        border: 1px #D0D0D0 solid;
        outline-color: #1B80CA;
        outline-width: thin;
        height: 32px;
    }

    input:hover {
        border-color: #1B80CA;
    }

    input:focus {
        background-color: white;
    }

    button {
        width: 100%;
        border-radius: 10px;
        height: 40px;
        text-align: center;
        background-color: #1B80CA;
        color: white;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 36px;
    }

    button:hover {
        opacity: 0.8;
    }
</style>