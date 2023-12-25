<script setup>
import { FilterMatchMode } from 'primevue/api';
import { onBeforeMount } from 'vue';
import { useBlogStore } from '~~/stores/blog';
import { useToast } from 'primevue/usetoast';

definePageMeta({
    layout: 'admin'
})

const blogs = ref(null);
const blog = ref('')
const selectedBlogs = ref(null);
const filters = ref({});
const deleteProductDialog = ref(false);
const dt = ref(null);
let stt = 1
const apiUrl = useRuntimeConfig()
const toast = useToast();
const pagination = ref({})

// Export csv
const exportCSV = () => {
    dt.value.exportCSV();
};

// Handle call api
const blogStore = useBlogStore()

// Gets all blogs
const getBlogs = (page) => {
    blogStore.getBlogs(page).then((res) => {
        blogs.value = res.data;
        pagination.value = res
    });
}

// Handle delete
const confirmDeleteBlog = async(dataBlog) => {
    deleteProductDialog.value = true;
    blog.value = dataBlog
};

const deleteBlog = () => {
    deleteProductDialog.value = false;
    blogStore.deleteBlog(blog.value.id).then(()=> {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Blog đã xóa thành công', life: 3000 });
    }) 
    .catch(function (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
    });
};

// Redirect to blog detail 
const editBlog = (editBlog) => {
   const id = editBlog.id
   return navigateTo(`/admin/blogs/${id}`)
};

// Call func befere mouted
onBeforeMount(() => {
    initFilters();
});

onMounted(() => {   
    getBlogs(1)
})

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
initFilters()
</script>

<template>
    <div class="flex flex-wrap">
        <div class="w-full">
            <div class="card">
                <PrimeToast />
                <PrimeToolbar class="mb-4 dark:bg-boxDarkMode flex-wrap">
                    <template v-slot:start>
                        <div class="my-2 flex flex-wrap">
                            <NuxtLink to="/admin/blogs/create" class=" button-animate overflow-hidden"><span><i class="pi pi-plus"></i></span><span class="ml-1.5">Create</span></NuxtLink>
                        </div>
                    </template>

                    <template v-slot:end>
                        <PrimeButton severity="info" label="Export" icon="pi pi-upload" class="p-PrimeButton-help" @click="exportCSV($event)" 
                        :pt="{ 
                            root: { class: 'bg-primary' } 
                        }"/>
                    </template>
                </PrimeToolbar>

                <PrimeDataTable
                    ref="dt"
                    :value="blogs"
                    v-model:selection="selectedBlogs"
                    dataKey="id"
                    :paginator="false"
                    :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPagePrimeDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll"
                >
                    <template #header>
                        <div class="flex flex-col md:flex-row md:justify-between md:items-center">
                            <h5 class="m-0 text-xl mb-1.5">Manage Blog Posts</h5>
                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search " />
                                <PrimeInputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>

                    <PrimeColumn selectionMode="multiple" headerStyle="width: 3rem"></PrimeColumn>
                    <PrimeColumn field="id" header="Stt" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Stt: </span>
                                <span class="ml-32 md:ml-0">{{ stt++ }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn header="Banner" headerStyle="width:14%; min-width:10rem;" >
                        <template #body="slotProps">
                           <div>
                                <span class="md:hidden font-bold absolute">Banner: </span>
                                <img :src="slotProps.data.banner ? apiUrl.public.apiBase + slotProps.data.banner : '/'"  alt="avatar" class="shadow-2 w-40 h-40 rounded overfow-hidden object-cover ml-32 md:ml-0" width="100" loading="lazy"/>
                           </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="title" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Title: </span>
                                <span class="ml-32 md:ml-0 text-ellipsis">{{ slotProps.data.title }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="category" header="Category name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                           <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Category name: </span>
                                <span class="ml-32 md:ml-0 text-ellipsis">{{ slotProps.data.category?.name }}</span>
                           </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="user" header="Author" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Author: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.user?.name }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn headerStyle="min-width:10rem;" header="Action">
                        <template #body="slotProps">
                            <PrimeButton severity="info" icon="pi pi-pencil" class="p-PrimeButton-rounded p-PrimeButton-success mr-2" @click="editBlog(slotProps.data)" 
                            :pt="{ 
                                root: { class: 'bg-primary' } 
                            }"/>
                            <PrimeButton severity="danger" icon="pi pi-trash" class="p-PrimeButton-rounded p-PrimeButton-warning mt-2" @click="confirmDeleteBlog(slotProps.data)" />
                        </template>
                    </PrimeColumn>
                </PrimeDataTable>
                <PrimeDialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="blog"
                            >Bạn có chắc là muốn xóa <b>{{ blog.title }}</b
                            > không?</span
                        >
                    </div>
                    <template #footer>
                        <PrimeButton label="No" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="deleteProductDialog = false" 
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }"/>
                        <PrimeButton label="Yes" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="deleteBlog" 
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }"
                        />
                    </template>
                </PrimeDialog>
                <AdminPagination :pagination="pagination" @page-changed="getBlogs"/>
            </div>
        </div>
    </div>
</template>
