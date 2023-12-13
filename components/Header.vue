<template>
    <header :class="{ 'navopen': navopen}" class="block w-full">
        <div :class="{ headerSticky: isSticky }" class="header fixed w-full z-20">
            <div class="header__inner flex items-center justify-between w-full container py-5 md:py-8 ">
                <a href="#">
                    <IconLogo class="w-[64px] lg:w-[84px]"/>
                </a>
                <div
                    class="w-full flex items-center justify-between lg:border-t-0 lg:border-l-0 lg:border-r-0 lg:border-b lg:border-solid lg:border-textPrimary">
                    <MegaMenu />
                    <div class="nav-action ml-auto">
                        <div class="hidden lg:flex guess items-center justify-center cursor-pointer">
                            <span class="text-xs mr-2 font-medium text-textPrimary">Login</span>
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
    const headerHeight = 100; // Set the height of your header
    const isSticky = ref(false);
    const lastScrollPosition = ref(0);
    const initHeight = ref(true)

    const toggleNav = () => {
        navopen.value = !navopen.value
    }

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > headerHeight) {
        initHeight.value = false
        isSticky.value = currentScrollPosition < lastScrollPosition.value;
      } else {
        isSticky.value = false;
        initHeight.value = true
      }

      lastScrollPosition.value = currentScrollPosition;
    };

    onBeforeMount(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
    });
</script>

<style scoped>
    .header {
        background-color: white;
        backdrop-filter: blur(20px);
        transition: all .6s;
    }

    .headerSticky.headerSticky {
        top: 0;
        opacity: 1;
    }

    .navopen .header {
        background-color: transparent;
        backdrop-filter: blur(0);
    }

    @media (max-width: 1023px) {
        .nav-button {
            display: inline-block;
            vertical-align: middle;
            width: 40px;
            height: 40px;
            cursor: pointer;
            position: relative;
            margin-left: 1.5em;
            position: relative;
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

        .nav-button span::before {
            content: "";
            top: -12px;
            width: 50%;
            left: 0;
            transition: top 0.3s, transform 0.3s, width 0.3s 0.3s;
        }

        .nav-button span::after {
            content: "";
            top: 12px;
            width: 50%;
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
</style>