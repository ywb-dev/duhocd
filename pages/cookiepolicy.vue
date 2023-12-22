<template>
    <div class="relative policy-page">
        <div class="bg_page w-full h-full h-screen">
            <div class="content px-10 py-20">
                <h2 class="">Chính Sách Cookie cho Website duhocd.com</h2>
                <ol>
                    <li>Giới thiệu</li>
                    <ul>
                        <li>Chúng tôi, website duhocd.com, sử dụng cookie để cải thiện trải nghiệm của bạn khi bạn truy cập website của chúng tôi.</li>
                        <li>Chính sách Cookie này giải thích cách chúng tôi sử dụng cookie và các công nghệ tương tự.</li>
                    </ul>
                    <li>Cookie Là Gì?</li>
                    <li>Cách Chúng Tôi Sử Dụng Cookie</li>
                </ol>
            </div>
        </div>
        <CookieConsent />
    </div>
</template>
<style scoped>
ul {
    list-style: circle;
    padding-left: 6px;
}
.bg_page {
    background: rgba(86, 171, 233, 0.55);
}
.policy-page .content {
    position: fixed;
    background: rgba(217, 217, 217, 0.25);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    width: 100%;
    max-width: 924px;
    margin: auto;
}

.policy-page .content h2 {
    font-size: 36px;
    font-weight: 900;
    color: white;
}
</style>
<script setup>
definePageMeta({
    layout: 'empty'
})
</script>