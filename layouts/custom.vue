<template>
    <div id="custom-layout">
        <div class="flex items-center justify-center min-h-screen min-w-screen overflow-hidden bg-[##f9fafb]">
            <slot/>
        </div>
        <CookieConsent />
    </div>
</template>