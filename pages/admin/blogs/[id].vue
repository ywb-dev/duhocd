<script setup>
    import Editor from 'primevue/editor';
    import { useCategoryStore } from '~~/stores/category';

    definePageMeta({
        layout: 'admin'
    });
    
    const tags = ref([])
    const categories = ref([])
    const blog = ref()
    const banner = ref('')
    const description = ref('')
    const title = ref('')
    const content = ref('')
    const categoryId = ref();
    const errorsMessage = ref('')

    const route = useRoute()
    const apiUrl = useRuntimeConfig()
    // Render Visible action
    const selectedAction = ref('Visible');
    const actions = ref([
        { name: 'Visible', key: 'A' },
        { name: 'Hidden', key: 'P' },
    ]);

    // Handle validate form
    const handleValidate = () => {
        if (!title.value || !content.value || !categoryId.value || !description.value || !banner.value) {
            errorsMessage.value = 'This field is required!'
            return false
        }
        return true
    }

    // Handle preview Image
    const preview = ref(null);
    const image = ref();

    const previewImage = (event) => {
        const input = event.target;
        if (input.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.value = e.target.result;
            };
            image.value = input.files[0];
            reader.readAsDataURL(input.files[0]);
        }
    };

    // Handle call api
    const blogStore = useBlogStore()
    const categoryStore = useCategoryStore()

    const getCategories = () => {
        categoryStore.getCategories().then((data) => {
            categories.value = data;
        });
    }
    const getBlog = async() => {
        await blogStore.getBlog(route.params.id).then((data) => {
            blog.value = data
            showPostData(data)
        })
    }

    // Display Post data
    const showPostData = (...data) => {
        title.value = blog.value.title
        description.value = blog.value.description
        content.value = blog.value.content
        banner.value = blog.value.banner
        // use id get all field data 
        const categoryObj = categories.value.filter((category) => {
            return category.id === blog.value.category_id
        })
        categoryId.value = categoryObj[0]
    }

    onMounted(() => {
        getCategories()
        getBlog()
    });

    // Handle save post
    const savePost = async() => {
        if (title.value && content.value && categoryId.value && banner.value) {
            const postData = {
                'title': title.value,
                'description': description.value,
                'content': content.value,
                'banner': banner.value,
                'category_id': categoryId.value.id
            }
            await blogStore.editBlog(route.params.id, postData).then(() => {
                alert('Bạn đã cập nhật thành công!')
                navigateTo({ path: '/admin/blogs' })
            }).catch(function (errors) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
                console.log(errors)
            })
        }
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
                                    }" v-model="title" placeholder="Nhập title" />
                                </span>
                                <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                    <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                                </div>
                            </div>
                            <div class="field-post flex flex-col mb-8">
                                <label class="mb-2" for="title">Descriptions</label>
                                <span class="p-input-icon-left">
                                    <PrimeTextarea  id="title" :pt="{
                                        root: { class: 'w-full p-4' },
                                        input: { class: 'w-full p-4' } 
                                    }" v-model="description" placeholder="Nhập mô tả" autoResize rows="5" />
                                </span>
                                <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                    <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                                </div>
                            </div>
                            <div class="blog banner lg:p-6 bg-white rounded-xl">
                                <h3 class="mb-2 mt-0">Blog post</h3>
                                <i>Thêm nôi dung của bài post ở đây để hiển thị ra Blog</i>
                                <Editor class="mt-6" v-model="content" editorStyle="height: 500px" />
                                <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                    <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                                </div>
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
                                <PrimeDropdown v-model="categoryId" editable :options="categories" optionLabel="name" placeholder="category" class="w-full " />
                                <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                    <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
                                </div>
                                <div class="w-full h-px bg-[#ced4da] my-2"></div>
                                <div class="form-group relative py-4">
                                    <label for="my-file" class=" font-medium text-black">Select Banner</label>
                                    <input type="file" accept="image/*"  @change="previewImage" class="form-control-file mx-auto w-full border-0" id="my-file">
                                    <div><small class="mt-2 block">Image type: jpeg, png, jpg, gif | max:2048</small></div>
                                    <div class="border mt-3 w-64 h-64 overfow-hidden bg-grey-400 rounded-xl">
                                        <template v-if="preview">
                                            <img :src="preview" class="img-fluid w-full h-full object-cover rounded-xl" />
                                            <div>
                                                <small class="mt-2 block">file name: {{ image.name }}</small>
                                                <small class="block">size: {{ image.size / 1024 }}KB</small>
                                            </div>
                                        </template>
                                        <img v-if="!preview && banner" :src="apiUrl.public.apiBase + banner" class="img-fluid w-full h-full object-cover rounded-xl" />
                                    </div>
                                </div>
                                    <div class="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                                        <small class="p-error" id="editor-error">{{ errorsMessage || '&nbsp;' }}</small>
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