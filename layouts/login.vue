<template>
    <div>
        <Header />
        <div class="pt-24 lg:pt-36">
            <div class="relative login-register">
                <PagesPageTitle title="Register & Login" />
                <PagesBannerAuth title="Get Involved ;)" bgColor="bg-textPrimary"
                    image="/image/frontend/auth/registerpage.png" width="400" height="116" />
                <div class="container relative">
                    <div class="login-tab flex -mb-5">
                        <NuxtLink class="block w-1/2 text-[15px] font-semibold text-black text-center pt-2 pb-6 bg-grey-300 rounded-t-2xl border border-solid border-primary hover:no-underline" to="/user/login">Login</NuxtLink>
                        <NuxtLink class="block w-1/2 text-[15px] font-semibold text-black text-center pt-2 pb-6 bg-grey-300 rounded-t-2xl border border-solid border-primary hover:no-underline" to="/user/register">Register</NuxtLink>
                    </div>
                    <div class="relative section-form border border-solid border-primary rounded-3xl bg-[#FAFAFA] pt-20 py-16">
                        <div class="form max-w-[282px] mx-auto">
                            <NuxtPage />
                        </div>
                    </div>
                </div>
                <SectionsRegisterPart />
            </div>
        </div>
        <Footer />
    </div>
</template>
<style scoped>
.router-link-active {
    background-color: #1B80CA;
    color: white;
}
</style>
<script setup>
</script>