<template>
    <div>
        <div class="header flex justify-center mb-12">
            <img width="158" height="58" src="/image/frontend/logo_login.png" alt="">
        </div>
        <div class="flex flex-col">
            <div class="field-fe w-full mb-5">
                <label for="email"></label>

                <input class="input-fe" :class="{ 'p-invalid': emailError }" v-model="email" name="email" id="email" placeholder="email address" type="text">
                <small v-if="emailError" class="p-error text-xs" id="text-error">{{ emailError || '&nbsp;' }}</small>
            </div>
            <div class="field-fe w-full mb-5">
                <label for="nickname"></label>
                <input class="input-fe" :class="{ 'p-invalid': nameError }" v-model="name" name="name" id="nickname" placeholder="nickname" type="text">
                <small v-if="nameError" class="p-error text-xs" id="text-error">{{ nameError || '&nbsp;' }}</small>
            </div>
            <div class="field-fe w-full relative">
                <ToolsPasswordStrength :password="password" />
                <div>
                    <label for="password"></label>
                    <input class="input-fe" :class="{ 'p-invalid': passwordError }" v-model="password" @input="checkPasswordStrength" name="password" id="password" placeholder="password" type="password">
                    <small v-if="passwordError" class="p-error text-xs" id="text-error">{{ passwordError || '&nbsp;' }}</small>
                </div>
            </div>
            <div class="field-fe w-full !mb-0">
                <label for="repatepw"></label>
                <input class="input-fe" :class="{ 'p-invalid': repatepwError }" v-model="repatepw" name="repatepw" id="repatepw" placeholder="repeat password" type="password">
                <small v-if="repatepwError" class="p-error text-xs" id="text-error">{{ repatepwError || '&nbsp;' }}</small>
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
            <button @click="onSubmit" class="btn-fe">Register</button>
        </div>
        <PrimeToast />
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

    .p-invalid {
        border: 1px solid red;
    }
</style>
<script setup>
    import { useToast } from 'primevue/usetoast';

  // Define PAge
  definePageMeta({
    layout: 'login'
  });

  // Handle Validate form
  const userStore = useUserStore()
  const { handleSubmit } = useForm();
  const toast = useToast();

  const { value: email, errorMessage: emailError } = useField('email', validateEmail);
  const { value: name, errorMessage: nameError } = useField('name', validateName);
  const { value: password, errorMessage: passwordError } = useField('password', validatePassword);
  const { value: repatepw, errorMessage: repatepwError } = useField('repatepw', validateRepeatPassword);
 
function validateEmail() {
    if (!email?.value) {
        return 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email?.value)) {
        return 'Email is not valid.';
    }   
    return true;
}

function validateName() {
    if (!name?.value) {
        return 'Name is required.';
    }
    return true;
}

function validatePassword() {
    if (!password?.value) {
        return 'Password is required.';
    } else if (password?.value.length < 8) {
        return 'Password must be at least 8 characters.';
    } 
    return true;
}

function validateRepeatPassword() {
    if (!repatepw?.value) {
        return 'Repeat password is required.';
    } else if (password?.value !== repatepw?.value) {
        return 'Passwords do not match.';
    } 
    return true;
}

  const onSubmit = handleSubmit(async(values) => {
        const res = await userStore.register(values)

        if(res?.success) {
            alert(`Congratulations!, you have successfully registered with email: "${res?.data?.email}". Let's go to login page!`)
            navigateTo('/user/login')
        } else {
            toast.add({ severity: 'error', summary: 'Error!', detail: res?.status == 422 ? 'The email has already been taken.' : '', life: 4000 });
        }
    });
</script>