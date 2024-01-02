<script setup>
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
const showModal = ref(false);
const isDataChanged = ref(false);
const nextAction = ref(null);
const isLoading = ref(false)
const popupInfo = ref(false);

const { transformValue } = useTransformValue();

// validate form
const { handleSubmit, resetForm } = useForm();
const { value: title, errorMessage: titleError } = useField('title', validateField);
const { value: slug, errorMessage: slugError } = useField('slug');
const { value: meta_title} = useField('meta_title');
const { value: like_init} = useField('like_init');
const { value: description, errorMessage: descriptionError } = useField('description', validateField);
const { value: content, errorMessage: contentError } = useField('content', validateField);
const { value: banner, errorMessage: bannerError } = useField('banner', validateField)
const { value: categoryId, errorMessage: categoryIdError } = useField('categoryId', validateField);

function validateField(value) {
    if (!value) {
        return 'This field is required.';
    }
    return true;
}
// end validate form

const blogStore = useBlogStore()
const selectedAction = ref(0);
const actions = ref([
    { name: 'Visible', value: 1, key: 'P' },
    { name: 'Hidden', value: 0, key: 'D' }
]);

const getCategories = () => {
    categoryStore.getCategories().then((data) => {
        categories.value = data;
        if (data.length > 0) {
            categoryId.value = data[0];
        }
    });
}
onMounted(() => {
    getCategories()
});

// Handle preview
const preview = ref(null);
const image = ref();
const onUpload = (e) => {
    const input = e.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.value = e.target.result;
        };
        image.value = input.files[0];
        banner.value = input.files[0]; 
        reader.readAsDataURL(input.files[0]);
    }
};

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
        navigateTo('/admin/blogs')
    }
    isDataChanged.value = false;
};

const savePost = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('description', description.value || null);
    formData.append('banner', banner.value || null);
    formData.append('content', content.value || null);
    formData.append('category_id', categoryId.value?.id);
    formData.append('status', selectedAction?.value);   
    formData.append('slug', transformValue(title.value) || null);
    formData.append('meta_title', meta_title?.value || null);
    formData.append('like_init', like_init?.value || 0);

    isLoading.value = true;

    try {
        await blogStore.createBlog(formData);
        isDataChanged.value = false;
        leavePage();
    } catch (errors) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
        console.log(errors);
    } finally {
        isLoading.value = false;
    }

    return true
})

</script>
<template>
    <ClientOnly>
        <div class="relative w-full">
            <div class="flex flex-wrap">
                <PrimeToast />
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
                            <div class="field-post flex flex-col mb-4">
                                <label class="mb-2" for="title">Post Title</label>
                                <span class="p-input-icon-left">
                                    <i class="pi pi-align-right" />
                                    <PrimeInputText id="title" :pt="{
                                        root: { class: 'w-full' }
                                    }" v-model="title" placeholder="Nhập title"
                                        :class="{ 'p-invalid': titleError }" />
                                </span>
                                <small class="p-error mt-2">{{ titleError }}</small>
                            </div>
                            <div class="field-post flex flex-col mb-4">
                                <label class="mb-2" for="title">Slug</label>
                                <span class="p-input-icon-left">
                                    <input class="h-[40px] w-full text-sm px-4" type="text" disabled :value="transformValue(title)" name="slug" readonly>
                                </span>
                                <small class="p-error mt-2">{{ slugError }}</small>
                            </div>
                            <div class="flex justify-between mb-4">
                                <div class="field-post flex flex-col flex-1">
                                    <label class="mb-2" for="title">Meta Title</label>
                                    <span class="p-input-icon-left">
                                        <i class="pi pi-align-right" />
                                        <PrimeInputText id="title" :pt="{
                                            root: { class: 'w-full' }
                                        }" v-model="meta_title" placeholder="Meta title"
                                        />
                                    </span>
                                </div>
                                <span class="flex items-center justify-center w-6 cursor-pointer h-6 ml-4 mt-auto mb-2 text-xs rounded-full bg-[#f8be2a] text-white border border-solid border-black" @click="popupInfo = true">
                                    <i class="pi pi-info" />
                                </span>
                            </div>
                            <div class="field-post flex flex-col mb-4">
                                <label class="mb-2" for="title">Descriptions</label>
                                <span class="p-input-icon-left">
                                    <PrimeTextarea id="title" :pt="{
                                        root: { class: 'w-full p-4' },
                                        input: { class: 'w-full p-4' }
                                    }" v-model="description" placeholder="Nhập mô tả" autoResize
                                        :class="{ 'p-invalid': descriptionError }" rows="5" />
                                </span>
                                <small class="p-error mt-2">{{ descriptionError }}</small>
                            </div>
                            <div class="blog banner lg:p-6 bg-white rounded-xl">
                                <h3 class="mb-2 mt-0">Blog content</h3>
                                <i>Thêm nôi dung của bài post ở đây để hiển thị ra Blog</i>
                                <Editor class="mt-6" v-model="content" editorStyle="height: 500px" />
                            </div>
                            <small class="p-error">{{ contentError }}</small>
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
                                        :value="action.value" />
                                    <label :for="action.key" class="ml-2 text-sm">{{ action.name }}</label>
                                </div>
                                <div class="w-full h-px bg-[#ced4da] my-2"></div>
                                <div>
                                    <h3>Likes</h3>
                                    <div><i class="pi pi-thumbs-up-fill text-primary"></i><span class="ml-2">123</span></div>
                                    <div class="flex flex-col mt-2">
                                        <label for="likeInit">Like init</label>
                                        <PrimeInputNumber v-model="like_init" inputId="likeInit" :useGrouping="false" />
                                        <small>eg: số like của bài post = like init + user liked</small>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                                <div>
                                    <PrimeDropdown v-model="categoryId" showClear :options="categories" optionLabel="name"
                                    placeholder="category" class="w-full" :class="{ 'p-invalid': categoryIdError }" />
                                    <small class="p-error">{{ categoryIdError }}</small>
                                </div>
                                    
                                <div class="w-full h-px bg-[#ced4da] my-2"></div>
                                <div class="card relative">
                                    <h4 class="mt-0 mb-4 text-base font-medium">Feature Image</h4>
                                    <label for="avatar" class="mb-4"></label>
                                    <input type="file" accept="image/*" @change="onUpload" :maxFileSize="1000000">
                                </div>
                                <small class="p-error mt-2">{{ bannerError }}</small>
                                <div class="border mt-3">
                                    <template v-if="preview">
                                        <div class="w-64 h-64 bg-grey-400 overfow-hidden rounded-xl">
                                            <img :src="preview" class="img-fluid w-full h-full object-cover rounded-xl" />
                                        </div>
                                        <div>
                                            <small class="block">size: {{ image.size / 1024 }}KB</small>
                                        </div>
                                    </template>
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
                <PrimeDialog class="text-black" v-model:visible="popupInfo" maximizable modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                    <p class="m-0">
                        # Meta Title, còn được gọi là "tiêu đề trang", là một yếu tố quan trọng trong SEO (Tối ưu hóa Công cụ Tìm kiếm) và UX (Trải nghiệm Người dùng). Dưới đây là một số điểm cần lưu ý khi thiết lập Meta Title:
                    </p>
                    <ol>
                        <li class="text-sm mb-2">Độ Dài Tối Ưu: Độ dài khuyến nghị cho Meta Title là khoảng 50-60 ký tự. Điều này đảm bảo rằng tiêu đề không bị cắt ngắn trên các trang kết quả của công cụ tìm kiếm (SERPs).</li>
                        <li class="text-sm mb-2">Mô Tả Chính Xác Nội Dung: Meta Title cần phản ánh một cách chính xác và rõ ràng nội dung của trang. Điều này giúp cải thiện cơ hội của bạn trong việc thu hút lượt click từ người dùng đang tìm kiếm thông tin liên quan.</li>
                        <li class="text-sm mb-2">Sử Dụng Từ Khóa: Nên bao gồm các từ khóa chính mà trang web của bạn muốn nhắm đến. Điều này giúp cải thiện vị trí của trang trong kết quả tìm kiếm liên quan.</li>
                        <li class="text-sm mb-2">Tránh Trùng Lặp và Lấp Đầy Từ Khóa: Mỗi trang nên có Meta Title riêng biệt và tránh lặp lại cùng một tiêu đề trên nhiều trang. Đồng thời, tránh "lấp đầy từ khóa" (keyword stuffing) vì điều này có thể ảnh hưởng tiêu cực đến xếp hạng SEO.</li>
                        <li class="text-sm mb-2">Thu Hút và Hấp Dẫn: Ngoài việc tối ưu cho công cụ tìm kiếm, Meta Title cũng cần hấp dẫn và thu hút người dùng. Một tiêu đề hấp dẫn sẽ khuyến khích họ nhấp vào link của bạn.</li>
                        <li class="text-sm mb-2">Thích Nghi với Nội Dung Động: Trong trường hợp trang web của bạn có nội dung động hoặc tùy chỉnh, hãy cân nhắc sử dụng script để tự động tạo Meta Title phù hợp với nội dung cụ thể của mỗi trang.</li>
                    </ol>
                </PrimeDialog>
            </div>
        </div>
        <ToolsLoading v-if="isLoading" />
    </ClientOnly>
</template>
