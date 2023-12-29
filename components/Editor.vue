<template>
    <div class="w-full h-full" >
        <ckeditor class="w-full" :editor="ClassicEditor" :config="editorConfig" v-model="editorHtml"></ckeditor>
    </div>
</template>
<script setup>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; 

    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])
    const apiUrl = useRuntimeConfig()

    const editorConfig = ref({
        language: 'en',
        toolbar: {
            items: [
                'heading', '|',
                'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                'outdent', 'indent', '|',
                'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
                'undo', 'redo'
            ],
        },
        ckfinder: {
            uploadUrl: `${apiUrl.public.apiBase}api/post/images`,
        },
    })

    const editorHtml = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value),
    })
</script>

<style>
.ck-editor__editable_inline {
    height: 500px;
}
</style>