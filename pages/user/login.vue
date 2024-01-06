<template>
    <div>
        <div class="header flex justify-center mb-12">
            <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
        </div>
        <div class="flex flex-col">
            <div class="field-fe w-full mb-5">
                <label for="email"></label>
                <input class="input-fe" v-model="email" :class="{ 'p-invalid': emailError }" name="email" id="email" placeholder="Email" type="text">
                <small v-if="emailError" class="p-error text-xs" id="text-error">{{ emailError || '&nbsp;' }}</small>
            </div>
            <div class="field-fe !mb-0 w-full">
                <label for="password"></label>
                <input class="input-fe" v-model="password" :class="{ 'p-invalid': passwordError }" name="password" id="password" placeholder="Password" type="password">
                <small v-if="passwordError" class="p-error text-xs" id="text-error">{{ passwordError || '&nbsp;' }}</small>
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
            <button @click="onSubmit" class="btn-fe">Login</button>
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
        <PrimeToast />
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
.p-invalid {
        border: 1px solid red;
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
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

definePageMeta({
    layout: 'login'
});

// Handle popup show
const visible = ref(false);
const userStore = useUserStore()
const toast = useToast();

const popup = () => {
    visible.value = true;
    document.body.classList.add('popup-show');
};
const closePopup = () => {
    visible.value = false;
    document.body.classList.remove('popup-show');
};

// validate
const { handleSubmit } = useForm();
const { value: email, errorMessage: emailError } = useField('email', validateEmail);
const { value: password, errorMessage: passwordError } = useField('password', validatePassword);

function validateEmail() {
    if (!email?.value) {
        return 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email?.value)) {
        return 'Email is not valid.';
    }   
    return true;
}

function validatePassword() {
    if (!password?.value) {
        return 'Password is required.';
    } 
    return true;
}
const onSubmit = handleSubmit(async(values) => {
    const logged = userStore.userLogin(values)
    logged.then(() => {
        if (!userStore?.isUserLoggedIn) {
            toast.add({ severity: 'error', summary: 'Error!', detail: userStore?.message, life: 4000 });
        } else {
            if (userStore?.isUserLoggedIn) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.api_token;
                navigateTo('/')
            }
        }
    })
});
</script>