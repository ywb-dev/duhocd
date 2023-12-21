<template>
    <div>
        <div class="header flex justify-center mb-12">
            <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
        </div>
        <div class="flex flex-col">
            <div class="field-fe w-full mb-5">
                <label for="email"></label>

                <input class="input-fe" name="email" id="email" placeholder="email address" type="text">
            </div>
            <div class="field-fe w-full mb-5">
                <label for="nickname"></label>
                <input class="input-fe" name="nickname" id="nickname" placeholder="nickname" type="text">
            </div>
            <div class="field-fe w-full relative">
                <ToolsPasswordStrength :password="password" />
                <div>
                    <label for="password"></label>
                    <input class="input-fe" v-model="password" @input="checkPasswordStrength" name="password" id="password" placeholder="password" type="password">
                </div>
            </div>
            <div class="field-fe w-full !mb-0">
                <label for="repatepw"></label>
                <input class="input-fe" name="repatepw" id="repatepw" placeholder="repeat password" type="password">
            </div>
            <div class="flex justify-center w-full mt-8">
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
            <button class="btn-fe">Register</button>
        </div>
    </div>
</template>
<style scoped>
    .bar_check > div {
        position: absolute;
        width: 21px;
        height: 6px;
        border-radius: 3px;
        background-color: #E4E4E4;
    }
</style>
<script setup>
  definePageMeta({
    layout: 'login'
  });

  const password = ref('')
</script>