<script setup>
    definePageMeta({
        layout: 'custom'
    })

    const { handleSubmit, resetForm } = useForm();
    const { value, errorMessage } = useField('value', validateField);

    function validateField(value) {
        if (!value) {
            return 'Email is required.';
        }

        return true;
    }

    const onSubmit = handleSubmit(async(values) => {
      // xử lý gửi mail lấy lại mật khẩu
    });
</script>
<template>
    <div class="flex flex-col items-center justify-center m-auto ">
        <div class="logo mb-5 flex-shrink-0">
            <IconLogo class="w-[70px]"/>
        </div>
        <div class="rounded-[56px] p-[0.25rem] bg-gradient">
            <div class="box rounded-[56px] px-6 py-16 md:px-14 min-w-[374px] md:min-w-[400px] bg-white">
                <header class="block text-center mb-5 w-full">
                    <h3 class="font-normal text-center text-2xl mb-3 mt-0 text-black">Quên mật khẩu</h3>
                </header>
                <div class="card">
                    <form @submit="onSubmit" class="flex flex-col gap-2">
                        <div class="field flex flex-col">
                            <label class="text-sm" for="value">Email</label>
                            <PrimeInputText name="value" id="value" class="border border-border-field w-full rounded px-4 py-2.5 hover:border-primary text-sm text-black" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                        </div>
                        <PrimeButton class="flex cursor-pointer text-center relative items-center overflow-hidden bg-primary text-white text-base rounded px-4 py-2.5 mt-2.5 hover:bg-primaryHover" type="submit" label="Submit" />
                    </form>
                    <PrimeToast />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .p-invalid {
        border: 1px solid red;
    }
    .bg-gradient {
        background: linear-gradient(180deg, #63c2f1 10%, rgba(33, 150, 243, 0) 30%);
    }
</style>
