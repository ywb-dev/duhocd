<script setup lang="ts">
    import Editor from 'primevue/editor';
    import { useCategoryStore } from '~~/stores/category';

    definePageMeta({
        layout: 'admin'
    });
    
    const categoryStore = useCategoryStore()
    const postitle = ref('')
    const editContent = ref('')
    const tags = ref([])
    const categories = ref([])

    const selectedAction = ref('Visible');
    const actions = ref([
        { name: 'Visible', key: 'A' },
        { name: 'Hidden', key: 'P' },
    ]);

    const selectedCategory = ref();

    const getCategories = () => {
        categoryStore.getCategories().then((data) => {
            categories.value = data;
        });
    }
    onMounted(() => {
        getCategories()
    });

    const handleFileAdded = (file) => {
        // Xử lý sự kiện khi ảnh được thêm vào
        console.log('Image added:', file);
        // Tải lên ảnh và cập nhật đường dẫn ảnh trong nội dung
        // uploadImage(file).then((imageUrl) => {
        //     // Set đường dẫn ảnh trong nội dung
        //     content.value = content.value + `<img src="${imageUrl}" alt="Uploaded Image" />`;
        // });
    };

    const savePost = () => {
        console.log('editContent:', editContent.value)
    }
</script>
<template>
    <div class="relative w-full">   
        <div class="flex flex-wrap">
            <div class="w-full lg:bg-[#f8f9fa] rounded-xl p-0 lg:p-8">
                    <div class="flex items-center">
                        <PrimeButton @click="$router.back()" icon="pi pi-arrow-left" severity="info"/>
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
                                    }" v-model="postitle" placeholder="Nhập title" />
                                </span>
                            </div>
                            <div class="blog banner lg:p-6 bg-white rounded-xl">
                                <h3 class="mb-2 mt-0">Summary</h3>
                                <i>Thêm nôi dung của bài post ở đây để hiển thị ra Blog</i>
                                <Editor class="mt-6" @file-added="handleFileAdded" v-model="editContent" editorStyle="height: 500px" />
                            </div>
                            <div class="action flex justify-end mt-8">
                                <PrimeButton class="mr-6" @click="savePost" severity="info">Save</PrimeButton>
                                <PrimeButton @click="" severity="help" text raised :pt="{
                                    root: { class: 'border border-solid border-primary text-primary'},
                                    label: { class: 'white'}
                                }">Cancel</PrimeButton>
                            </div>
                        </div>
                        <div class="sidebar relative w-full lg:max-w-[340px] mt-6 lg:mt-0 ml-0 lg:ml-6">
                            <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                                <h4 class="mt-0 text-base font-medium">Visibility</h4>
                                <div v-for="action in actions" :key="action.key" class="flex align-items-center mb-4">
                                    <PrimeRadioButton v-model="selectedAction" :inputId="action.key" name="dynamic" :value="action.name" />
                                    <label :for="action.key" class="ml-2 text-sm">{{ action.name }}</label>
                                </div>
                            </div>
                            <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                                <PrimeDropdown v-model="selectedCategory" editable :options="categories" optionLabel="name" placeholder="category" class="w-full mb-4" />
                                <div class="w-full h-px bg-[#ced4da] my-2"></div>
                                <div class="card relative">
                                        <h4 class="mt-0 mb-4 text-base font-medium">Feature Image</h4>
                                        <PrimeFileUpload name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                                            <template #empty>
                                                <p>Drag and drop files to here to upload.</p>
                                            </template>
                                        </PrimeFileUpload>
                                    </div>
                          
                                <div class="mt-4">
                                    <label for="tag" class="text-sm font-medium">Tags:</label>
                                    <PrimeChips id="tag" class="w-full mt-2 " v-model="tags" separator="," :pt="{
                                        container: { class: 'w-full' },
                                        label: { class: 'text-white'},
                                        removeTokenIcon: { class: 'text-white' },
                                        token: { class: 'bg-primary'}
                                    }" />
                                    <small class="mt-2 block">Press Enter or ',' to add multiple tags</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
    </div>
</template>
