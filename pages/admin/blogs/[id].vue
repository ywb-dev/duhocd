<script setup lang="ts">
    definePageMeta({
        layout: 'admin'
    });
</script>
<template>
        <div>
            <PrimeFileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                <template #empty>
                    <p>Drag and drop files to here to upload.</p>
                </template>
            </PrimeFileUpload>
            <PrimeToast />
        </div>
</template>
