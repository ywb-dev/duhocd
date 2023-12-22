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
            <button @click="popup" class="btn-fe !mt-6 ">Reset Password</button>
        </div>
        <transition name="overlay" appear>
            <div class="overlay fixed top-0 left-0 w-full h-full" v-show="visible" @click="closePopup">
                <div class="popup absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[380px]" @click.stop>
                    <div class="nav-button" @click="closePopup"><span></span></div>
                    <div class="login-tab flex -mb-5">
                        <div class="block w-full text-[15px] font-semibold text-black text-center pt-2 pb-6 bg-textPrimary text-white rounded-t-2xl border border-solid border-primary">Reset Password</div>
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
                                <p class="text-xs font-normal text-black mt-4 text-center">Gửi cho tôi email để lấy lại mật
                                    khẩu</p>
                                <button class="mx-auto !w-fit !bg-transparent cursor-pointer">
                                    <!-- <svg width="50" height="50" viewBox="0 0 50 50" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group 212">
                                            <circle id="Ellipse 30" cx="25" cy="25" r="24.5" fill="#D9D9D9" stroke="#1B80CA" />
                                            <path id="Arrow 7"
                                                d="M35.7071 25.7071C36.0976 25.3166 36.0976 24.6834 35.7071 24.2929L29.3431 17.9289C28.9526 17.5384 28.3195 17.5384 27.9289 17.9289C27.5384 18.3195 27.5384 18.9526 27.9289 19.3431L33.5858 25L27.9289 30.6569C27.5384 31.0474 27.5384 31.6805 27.9289 32.0711C28.3195 32.4616 28.9526 32.4616 29.3431 32.0711L35.7071 25.7071ZM17 26H35V24H17V26Z"
                                                fill="#1B80CA" />
                                        </g>
                                    </svg> -->
                                    <div class="arrow">
                                        <div class="arrow-icon"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
 /* overlay */
.overlay {
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
}
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}
.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

/* close button animation */
.nav-button {
    position: absolute;
    right: 16px;
    top: 16px;
    vertical-align: middle;
    width: 20px;
    height: 12px;
    cursor: pointer;
    margin-left: 1.5em;
    z-index: 100;
}
.nav-button span::before,
.nav-button span::after {
    position: absolute;
    top: 50%;
    left: 0%;
    display: block;
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 2px;
    width: 20px;
}
.nav-button span::before {
    content: "";
    top: 0;
    left: 0;
    transition: top 0.2s, transform 0.2s, width 0.2s 0.2s;
}
.nav-button span::after {
    content: "";
    top: 6px;
    right: 0%;
    left: auto;
    transition: top 0.2s, transform 0.2s, left 0.2s, width 0.2s 0s;
}
.nav-button:hover span::before {
    top: 4px;
    transform: rotate(45deg);
    transition-delay: 0s, 0.2s;
    width: 100%;
}
.nav-button:hover span::after {
    top: 4px;
    transform: rotate(-45deg);
    transition-delay: 0s, 0.2s;
    left: 0;
    width: 100%;
}
/* button animation */
    .arrow{
        position:relative;
        width:50px;
        height: 50px;
        cursor:pointer;
        transition: 0.5s;
        overflow:hidden;
        border:solid 1.5px #1B80CA; 
        border-radius:50%;
    }
    .arrow-icon{
        position:relative;
        width:50px;
        height: 50px;
        cursor:pointer;
        transition: 0.5s;
        overflow:hidden;
        border-radius:50%;
    }
    .arrow-icon:after{
        position:absolute;
        display:block;
        content:"";
        color:#1B80CA;
        width: 20px;
        height: 15px;
        top: 9px;
        left: 8px;
        border-bottom:solid 2px;
        transform:translatex(6px);
    }

    .arrow-icon:before{
        position:absolute;
        display:block;
        content:"";
        color:#1B80CA;
        width: 8px;
        height: 8px;
        border-top:solid 2px;
        border-left:solid 2px;
        top:50%;
        right: 3px;
        transform-origin:0% 0%;
        transform:rotatez(135deg);

    }
    .arrow-icon:hover{
        animation: aniArrow01 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.3s;
    }

    .arrow-icon:hover{
     animation: aniArrow02 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.3s;
    }

    @keyframes aniArrow01 {
        0% {
            transform:translateX(-44px);
        }
        100% {
            transform:translateX(45px);
        }
    }

    @keyframes aniArrow02 {
        0% {
            transform:translateX(-44px);
        }
        100% {
            transform:translateX(45px);
        }
    }
</style>
<script setup>
definePageMeta({
    layout: 'login'
});

// Handle popup show
const visible = ref(false);
const popup = () => {
    visible.value = true;
    document.body.classList.add('popup-show');
};
const closePopup = () => {
    visible.value = false;
    document.body.classList.remove('popup-show');
};
</script>