<template>
    <header :class="{ 'navopen': navopen}" class="block w-full">
        <div :class="{ headerSticky: isSticky,  headerScroll: isScroll }" class="header fixed w-full z-50">
            <div class="header__inner flex items-center justify-between w-full container py-4 lg:pt-5 lg:py-5">
                <a class="flex" href="/">
                    <IconLogo class="logo-blue w-12 h-12 lg:w-20 lg:h-20"/>
                    <IconLogoWhite class="logo-white hidden"/>
                </a>
                <div
                    class="menu__wrap w-full flex items-center justify-between lg:border-t-0 lg:border-l-0 lg:border-r-0 lg:border-b lg:border-solid lg:border-textPrimary">
                    <MegaMenu />
                    <div class="nav-action ml-auto">
                        <NuxtLink v-if="!token" to="/user/login" class="hidden lg:flex guess items-center justify-center cursor-pointer">
                            <span class="text-login text-xs mr-2 font-medium text-textPrimary">Login</span>
                            <span class="icon">
                                <svg width="24" height="30" viewBox="0 0 24 30" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5714 28.7916C22.0261 28.7916 22.4621 28.5664 22.7836 28.1654C23.1051 27.7645 23.2857 27.2208 23.2857 26.6538V7.43054H1V26.6538C1 27.2208 1.18061 27.7645 1.5021 28.1654C1.82359 28.5664 2.25963 28.7916 2.71429 28.7916H21.5714Z"
                                        fill="white" />
                                    <path
                                        d="M1.50229 1.62638C1.18077 2.0272 1.0001 2.57088 1 3.13781V7.43696H23.2857V3.13781C23.2857 2.57083 23.1051 2.02707 22.7836 1.62615C22.4621 1.22523 22.0261 1 21.5714 1H2.71429C2.25967 1.00012 1.8237 1.22543 1.50229 1.62638Z"
                                        fill="#1B80CA" />
                                    <path
                                        d="M1.50229 1.62638C1.18077 2.0272 1.0001 2.57088 1 3.13782V7.43696H23.2857V3.13782C23.2857 2.57083 23.1051 2.02707 22.7836 1.62615C22.4621 1.22523 22.0261 1 21.5714 1H2.71429C2.25967 1.00012 1.8237 1.22543 1.50229 1.62638Z"
                                        stroke="#1B80CA" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M21.5714 28.7916C22.0261 28.7916 22.4621 28.5664 22.7836 28.1654C23.1051 27.7645 23.2857 27.2208 23.2857 26.6538V7.43054H1V26.6538C1 27.2208 1.18061 27.7645 1.5021 28.1654C1.82359 28.5664 2.25963 28.7916 2.71429 28.7916H21.5714Z"
                                        stroke="#1B80CA" stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M8.28571 22.3781V18.1025C8.28571 17.819 8.37601 17.5471 8.53676 17.3466C8.6975 17.1462 8.91552 17.0336 9.14285 17.0336H15.1428C15.3702 17.0336 15.5882 17.1462 15.7489 17.3466C15.9097 17.5471 16 17.819 16 18.1025V22.3781C16 22.6616 15.9097 22.9335 15.7489 23.1339C15.5882 23.3344 15.3702 23.447 15.1428 23.447H9.14285C8.91552 23.447 8.6975 23.3344 8.53676 23.1339C8.37601 22.9335 8.28571 22.6616 8.28571 22.3781Z"
                                        fill="#1B80CA" />
                                    <path
                                        d="M8.28571 22.3781V18.1025C8.28571 17.819 8.37601 17.5471 8.53676 17.3466C8.6975 17.1462 8.91552 17.0336 9.14285 17.0336H15.1428C15.3702 17.0336 15.5882 17.1462 15.7489 17.3466C15.9097 17.5471 16 17.819 16 18.1025V22.3781C16 22.6616 15.9097 22.9335 15.7489 23.1339C15.5882 23.3344 15.3702 23.447 15.1428 23.447H9.14285C8.91552 23.447 8.6975 23.3344 8.53676 23.1339C8.37601 22.9335 8.28571 22.6616 8.28571 22.3781Z"
                                        stroke="#1B80CA" stroke-linejoin="round" />
                                    <path
                                        d="M9.57144 17.0336V14.8958C9.57144 14.0453 9.84236 13.2297 10.3246 12.6283C10.8068 12.0269 11.4609 11.6891 12.1429 11.6891C12.8249 11.6891 13.4789 12.0269 13.9611 12.6283C14.4434 13.2297 14.7143 14.0453 14.7143 14.8958V17.0336"
                                        stroke="#1B80CA" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </NuxtLink>
                        <!-- đã đăng nhập -->
                        <div class="relative auth-nav" v-else>
                            <div @click="authAction = !authAction" class="relative hidden lg:flex guess items-center justify-center cursor-pointer">
                                <span class="text-login text-xs mr-2 font-medium text-textPrimary">MyPage</span>
                                <span class="icon">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="15" cy="15" r="14" fill="#E5F3FD" stroke="#1B80CA"/>
                                        <path d="M14.7493 16C8.59308 16 7.04228 22.0313 7.00086 25.656C6.99537 26.1367 7.19147 26.5986 7.57555 26.8877C8.77601 27.7911 11.2422 29 14.7493 29C18.1914 29 20.8618 27.8355 22.2639 26.9382C22.7526 26.6255 23.0078 26.0679 22.9653 25.4892C22.6982 21.8496 20.812 16 14.7493 16Z" fill="white" stroke="#1B80CA" stroke-linecap="round"/>
                                        <circle cx="15" cy="11" r="6" fill="white" stroke="#1B80CA"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="box-action z-20 transition-all absolute top-full left-0 py-4 w-40 bg-white border border-solid border-textPrimary rounded-xl">
                                <NuxtLink class="px-4 w-full !no-underline block py-1.5 cursor-pointer hover:bg-primary hover:text-white" to="/profile"><span class="text-sm block w-full text-textPrimary hover:text-white">My page</span></NuxtLink>
                                <p @click="logout" class="px-4 text-sm mb-0 text-textPrimary py-1.5 cursor-pointer hover:bg-primary hover:text-white">logout</p>
                            </div>
                        </div>
                        
                        <client-only>
                            <div class="nav-button" @click="toggleNav"><span></span></div>
                        </client-only>
                    </div>
                </div>
            </div>
        </div>
        <MobileMenu/>
    </header>
</template>
<script setup>
    const navopen = ref(false)
    const headerHeight = 100; 
    const isSticky = ref(false);
    const isScroll = ref(false);
    const lastScrollPosition = ref(0);
    const initHeight = ref(true);
    const authAction = ref(false);

    const userStore = useUserStore()

    const toggleNav = () => {
        navopen.value = !navopen.value
    }

    const logout = () => {
        userStore.userLogout()
    }

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > headerHeight) {
        initHeight.value = false
        isScroll.value = true;
        isSticky.value = currentScrollPosition < lastScrollPosition.value;
      } else {
        isSticky.value = false;
        initHeight.value = true
        isScroll.value = false;
      }

      lastScrollPosition.value = currentScrollPosition;
    };

    onBeforeMount(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const token = useCookie('token')
</script>

<style scoped>
    .header {
        top: 0;
        background-color: white;
        box-shadow: 0 1px 5px #b3b3b3;
        transition: transform .4s ease-in-out, opacity .4s ease-in-out, background-color .4s ease-in-out;
    }

    .box-action {
        visibility: hidden;
        opacity: 0;
        transform: translateY(40px);
        transition: all .3s ease;
    }

    .auth-nav:hover .box-action{
        display: block;
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
    }

    .headerScroll {
        opacity: 0;
        transform: translateY(-100%);
    }

    .headerSticky {
        opacity: 1;
        transform: translateY(0); 
        box-shadow: 0 1px 5px #b3b3b3;
    }

    .navopen .header {
        box-shadow: none;
    }

    @media (min-width: 1024px) {
        .header {
            box-shadow: none;
        }
        .headerSticky {
            background-color: #1B80CA; 
            box-shadow: 2px 1px 5px #5d5b5b;
        }
        .headerSticky .logo-blue {
            display: none;
        }

        .headerSticky .logo-white {
            display: block;
        }
    }
    .headerSticky .text-login {
        color: white;
    }
    .navopen .header {
        background-color: transparent;
        backdrop-filter: blur(0);
    }

    @media (max-width: 1023px) {
        .nav-button {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 12px;
            cursor: pointer;
            position: relative;
            margin-left: 1.5em;
            z-index: 1000;
        }
        .nav-button span,
        .nav-button span::before,
        .nav-button span::after {
            position: absolute;
            top: 50%;
            left: 0%;
            display: block;
            width: 100%;
            height: 2px;
            background: #1B80CA;
            border-radius: 2px;
        }
        .nav-button span::before,
        .nav-button span::after {
            width: 15px;
        }
        .nav-button span {
            width: 20px; 
        }
        .nav-button span::before {
            content: "";
            top: -6px;
            left: 0;
            transition: top 0.3s, transform 0.3s, width 0.3s 0.3s;
        }
        .nav-button span::after {
            content: "";
            top: 6px;
            right: 0%;
            left: auto;
            transition: top 0.3s, transform 0.3s, left 0.3s, width 0.3s 0s;
        }
        .nav-button:hover span::after,
        .nav-button:hover span::before {
            width: 100%;
        }
        .navopen .nav-button span {
            background-color: transparent;
        }
        .navopen .nav-button span::before {
            top: 0;
            transform: rotate(45deg);
            transition-delay: 0s, 0.3s;
            width: 100%;
        }
        .navopen .nav-button span::after {
            top: 0;
            transform: rotate(-45deg);
            transition-delay: 0s, 0.3s;
            left: 0;
            width: 100%;
        }
    }

    .headerSticky .menu__wrap {
        border-color: white;
    }

    .box-action {
        box-shadow: 2px 1px 5px #5d5b5b;
    }
</style>