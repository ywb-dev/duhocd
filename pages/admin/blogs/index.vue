<script setup>
import { FilterMatchMode } from 'primevue/api';
import { onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useBlogStore } from '~~/stores/blog';

definePageMeta({
    layout: 'admin'
})

const toast = useToast();
const blogStore = useBlogStore()
const blogs = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const stt = 1
const submitted = ref(false);

const getBlogs = () => {
    blogStore.getBlogs().then((data) => {
        blogs.value = data;
    });
}

const getDefaultAvatar = async () => {
  const defaultAvatarPath = '/image/avatar-default-icon.png';
  const response = await fetch(defaultAvatarPath);
  const blob = await response.blob();
  return blob;
};

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
    getBlogs()
});

const saveProduct = async () => {
    submitted.value = true; 
    const formData = new FormData();

    if (product.value.avatar) {
        formData.append('avatar', product.value.avatar);
    } else {
        const defaultAvatarBlob = await getDefaultAvatar();
        formData.append('avatar', defaultAvatarBlob, 'avatar-default-icon.png');
    }

    formData.append('avatar', product.value.avatar || null);
    formData.append('name', product.value.name || null);
    formData.append('username', product.value.username || null );
    formData.append('email', product.value.email || null);
    formData.append('phone', product.value.phone || '000000000');

    if (product.value.email && product.value.email.trim() && product.value.username) {
        if (product.value.id) {
            await blogStore.editUser(product.value.id, product.value).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Edited', life: 3000 });  
                getBlogs()
            }).catch(function(errors) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });  
                console.log(errors)
            })
        } else {        
            await blogStore.createUser(formData).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });  
                getBlogs()
            }).catch(function(errors) {
                console.log(errors)
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });  
            })
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    blogs.value = blogs.value.filter((val) => val.id !== product.value.id);
    blogStore.deleteUser(product.value.id).then(()=> {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'User đã xóa thành công', life: 3000 });
    }) 
    .catch(function (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
    });
    deleteProductDialog.value = false;
    product.value = {};
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    blogs.value = blogs.value.filter((val) => {
       return !selectedProducts.value.includes(val)
    });

    const userIds = selectedProducts.value.map(user => user.id);
  
    blogStore.deleteSelectUser(userIds).then(()=> {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'User đã xóa thành công', life: 3000 });
    }).catch(function(error) {
        console.log(error)
        toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });
    })
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
};

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
                            <NuxtLink to="/admin/blogs/create" class=" button-animate"><span><i class="pi pi-plus"></i></span><span class="ml-1.5">Create</span></NuxtLink>
                            <PrimeButton severity="danger" label="Delete" icon="pi pi-trash" class="p-PrimeButton-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
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
                    v-model:selection="selectedProducts"
                    dataKey="id"
                    :paginator="true"
                    :rows="10"
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
                                <img :src="'/image/avatar-default-icon.png'" alt="avatar" class="shadow-2 w-40 h-40 rounded overfow-hidden object-cover ml-32 md:ml-0" width="100" />
                           </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="tile" header="Title" :sortable="true" headerStyle="width:14%; min-width:10rem;">
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
                            <PrimeButton severity="info" icon="pi pi-pencil" class="p-PrimeButton-rounded p-PrimeButton-success mr-2" @click="editProduct(slotProps.data)" 
                            :pt="{ 
                                root: { class: 'bg-primary' } 
                            }"/>
                            <PrimeButton severity="danger" icon="pi pi-trash" class="p-PrimeButton-rounded p-PrimeButton-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </PrimeColumn>
                </PrimeDataTable>
            </div>
        </div>
    </div>
</template>
