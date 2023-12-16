<script setup>
import Editor from 'primevue/editor';
import { useCategoryStore } from '~~/stores/category';
import { useToast } from 'primevue/usetoast';
import { ref, onMounted, watch } from 'vue';

definePageMeta({
    layout: 'admin'
});

const categoryStore = useCategoryStore()
const toast = useToast();
const tags = ref([])
const categories = ref([])
const banner = ref('')
const description = ref('')
const title = ref('')
const content = ref('')
const categoryId = ref();
const errorsMessage = ref('')
const showModal = ref(false);
const isDataChanged = ref(false);
const nextAction = ref(null);

// validate form
const handleValidate = () => {
    if (!title.value || !content.value || !categoryId.value || !description.value || !banner.value) {
        errorsMessage.value = 'This field is required!'
        return false
    }
    return true
}
// end validate form

const blogStore = useBlogStore()
const selectedAction = ref('Visible');
const actions = ref([
    { name: 'Visible', key: 'A' },
    { name: 'Hidden', key: 'P' },
]);

const getCategories = () => {
    categoryStore.getCategories().then((data) => {
        categories.value = data;
    });
}
onMounted(() => {
    getCategories()
});
const onUpload = (e) => {
    const file = e.target.files[0]
    banner.value = file
};

// kiểm tra xem dữ liệu đã được lưu chưa
watch([title, description, content, categoryId, banner], () => {
    isDataChanged.value = true;
}, { deep: true });

onBeforeRouteLeave((to, from, next) => {
    if (isDataChanged.value) {
        showModal.value = true;
        nextAction.value = next;
    } else {
        next();
    }
});

const leavePage = () => {
    showModal.value = false;
    if (nextAction.value) {
        nextAction.value();
        nextAction.value = null;
    } else {
        // Chuyển hướng mặc định khi không có hành động chuyển hướng cụ thể
        navigateTo('/admin/blogs')
    }
    isDataChanged.value = false;
};

const savePost = async () => {
    handleValidate()
    if (title.value && content.value && categoryId.value) {
        const formData = new FormData();

        formData.append('title', title.value);
        formData.append('description', description.value || null);
        formData.append('banner', banner.value || null);
        formData.append('content', content.value || null);
        formData.append('category_id', categoryId.value.id);

        await blogStore.createBlog(formData).then(() => {
            isDataChanged.value = false;
            alert('Bạn đã tạo post thành công!')
            leavePage();
        }).catch(function (errors) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
            console.log(errors)
        })
    }
    return true
}
</script>
<template>
    <div class="relative w-full">
        <div class="flex flex-wrap">
            <div class="w-full lg:bg-[#f8f9fa] rounded-xl p-0 lg:p-8">
                <div class="flex items-center">
                    <PrimeButton @click="$router.back()" icon="pi pi-arrow-left" severity="info" />
                    <span class="text-base ml-4">Back to lists</span>
                </div>
                <div class="content__wrap flex flex-col lg:flex-row">
                    <div class="flex-1 pb-20">
                        <div class="flex flex-col">
                            <h2 class="mt-10 mb-6">Add new posts</h2>
                        </div>
                        <div class="field-post flex flex-col mb-8">
                            <label class="mb-2" for="title">Post Title</label>
                            <span class="p-input-icon-left">
                                <i class="pi pi-align-right" />
                                <PrimeInputText id="title" :pt="{
                                    root: { class: 'w-full' }
                                }" v-model="title" placeholder="Nhập title" />
                            </span>
                            <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                            </div>
                        </div>
                        <div class="field-post flex flex-col mb-8">
                            <label class="mb-2" for="title">Descriptions</label>
                            <span class="p-input-icon-left">
                                <PrimeTextarea id="title" :pt="{
                                    root: { class: 'w-full p-4' },
                                    input: { class: 'w-full p-4' }
                                }" v-model="description" placeholder="Nhập mô tả" autoResize rows="5" />
                            </span>
                            <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                            </div>
                        </div>
                        <div class="blog banner lg:p-6 bg-white rounded-xl">
                            <h3 class="mb-2 mt-0">Summary</h3>
                            <i>Thêm nôi dung của bài post ở đây để hiển thị ra Blog</i>
                            <Editor class="mt-6" v-model="content" editorStyle="height: 500px" />
                            <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                            </div>
                        </div>
                        <div class="action flex justify-end mt-8">
                            <PrimeButton class="mr-6" @click="savePost" severity="info">Save</PrimeButton>
                            <PrimeButton @click="" severity="help" text raised :pt="{
                                root: { class: 'border border-solid border-primary text-primary' },
                                label: { class: 'white' }
                            }">Cancel</PrimeButton>
                        </div>
                    </div>
                    <div class="sidebar relative w-full lg:max-w-[340px] mt-6 lg:mt-0 ml-0 lg:ml-6">
                        <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                            <h4 class="mt-0 text-base font-medium">Visibility</h4>
                            <div v-for="action in actions" :key="action.key" class="flex align-items-center mb-4">
                                <PrimeRadioButton v-model="selectedAction" :inputId="action.key" name="dynamic"
                                    :value="action.name" />
                                <label :for="action.key" class="ml-2 text-sm">{{ action.name }}</label>
                            </div>
                        </div>
                        <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                            <PrimeDropdown v-model="categoryId" editable :options="categories" optionLabel="name"
                                placeholder="category" class="w-full " />
                            <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                            </div>
                            <div class="w-full h-px bg-[#ced4da] my-2"></div>
                            <div class="card relative">
                                <h4 class="mt-0 mb-4 text-base font-medium">Feature Image</h4>
                                <label for="avatar" class="mb-4">Banner</label>
                                <input type="file" accept="image/*" @change="onUpload" :maxFileSize="1000000">
                            </div>
                            <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                            </div>
                            <div class="mt-4">
                                <label for="tag" class="text-sm font-medium">Tags:</label>
                                <PrimeChips id="tag" class="w-full mt-2 " v-model="tags" separator="," :pt="{
                                    container: { class: 'w-full' },
                                    label: { class: 'text-white' },
                                    removeTokenIcon: { class: 'text-white' },
                                    token: { class: 'bg-primary' }
                                }" />
                                <small class="mt-2 block">Press Enter or ',' to add multiple tags</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PrimeDialog v-model:visible="showModal" modal :style="{ width: '450px' }" header="Warning">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>
                        Bạn vừa có thay đổi chưa lưu. Bạn có chắc là muốn thoát không?</span>
                </div>
                <template #footer>
                    <PrimeButton label="Discard" @click="leavePage" icon="pi pi-times" severity="info" outlined
                        class="p-PrimeButton-text" :pt="{
                            label: { class: 'font-semibold' }
                        }" />
                    <PrimeButton label="Save Post" icon="pi pi-check" @click="savePost" severity="info" outlined
                        class="p-PrimeButton-text" :pt="{
                            label: { class: 'font-semibold' }
                        }" />
                </template>
            </PrimeDialog>
        </div>
    </div>
</template>
