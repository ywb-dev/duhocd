<script setup>
import { FilterMatchMode } from 'primevue/api';
import { onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useUserStore } from '~~/stores/user';

definePageMeta({
    layout: 'admin'
})

const toast = useToast();
const userStore = useUserStore()
const users = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const stt = 1
const submitted = ref(false);

const apiUrl = useRuntimeConfig()

const getUsers = () => {
    userStore.getUsers().then((data) => {
        users.value = data;
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
    getUsers()
});

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const onUpload = (e) => {
    const file = e.target.files[0]
    product.value.avatar = file
};

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
            await userStore.editUser(product.value.id, product.value).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Edited', life: 3000 });  
                getUsers()
            }).catch(function(errors) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });  
                console.log(errors)
            })
        } else {        
            await userStore.createUser(formData).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });  
                getUsers()
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
    users.value = users.value.filter((val) => val.id !== product.value.id);
    userStore.deleteUser(product.value.id).then(()=> {
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
    users.value = users.value.filter((val) => {
       return !selectedProducts.value.includes(val)
    });

    const userIds = selectedProducts.value.map(user => user.id);
  
    userStore.deleteSelectUser(userIds).then(()=> {
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
                        <div class="my-2">
                            <PrimeButton severity="info" label="New" icon="pi pi-plus" raised  class="p-PrimeButton-success mr-2 p-button-icon" @click="openNew" 
                            :pt="{ 
                                root: { class: 'bg-primary' } 
                            }"/>
                            <PrimeButton severity="danger" label="Delete" icon="pi pi-trash" class="p-PrimeButton-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                        </div>
                    </template>

                    <template v-slot:end>
                        <!-- <PrimeFileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" /> -->
                        <PrimeButton severity="info" label="Export" icon="pi pi-upload" class="p-PrimeButton-help" @click="exportCSV($event)" 
                        :pt="{ 
                            root: { class: 'bg-primary' } 
                        }"/>
                    </template>
                </PrimeToolbar>

                <PrimeDataTable
                    ref="dt"
                    :value="users"
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
                            <h5 class="m-0 text-xl mb-1.5">Manage Users</h5>
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
                    <PrimeColumn header="Avatar" headerStyle="width:14%; min-width:10rem;" >
                        <template #body="slotProps">
                           <div>
                                <span class="md:hidden font-bold absolute">Avatar: </span>
                                <img :src="slotProps.data.avatar ? apiUrl.public.apiBase + slotProps.data.avatar : '/image/avatar-default-icon.png'" alt="avatar" class="shadow-2 w-20 h-20 object-cover ml-32 md:ml-0" width="100" />
                           </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Name: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.name }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="username" header="User name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                           <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">User name: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.username }}</span>
                           </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="email" header="Emails" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Email: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.email }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <!-- <PrimeColumn field="phone" header="Phone" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.phone }}
                        </template>
                    </PrimeColumn> -->
                    <!-- <PrimeColumn field="roles" header="Roles" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Roles: </span>
                                <span class="ml-32 md:ml-0" :class="'product-badge role-' + (slotProps.data.roles ? slotProps.data.roles.toLowerCase() : '')">{{ slotProps.data.roles }}</span>
                            </div>
                        </template>
                    </PrimeColumn> -->
                    <PrimeColumn field="status" header="Status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Status: </span>
                                <span class="ml-32 md:ml-0" :class="'product-badge role-' + (slotProps.data.status ? slotProps.data.roles.toLowerCase() : '')">{{ slotProps.data.roles }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn headerStyle="min-width:10rem;">
                        <template #body="slotProps">
                            <PrimeButton severity="info" icon="pi pi-pencil" class="p-PrimeButton-rounded p-PrimeButton-success mr-2" @click="editProduct(slotProps.data)" 
                            :pt="{ 
                                root: { class: 'bg-primary' } 
                            }"/>
                            <PrimeButton severity="danger" icon="pi pi-trash" class="p-PrimeButton-rounded p-PrimeButton-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </PrimeColumn>
                </PrimeDataTable>

                <PrimeDialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Users Details" :modal="true" class="p-fluid">
                    <div class="filed mb-4 flex  flex-col items-center justify-center">
                       <div class="w-28 h-28 overflow-hidden rounded-full mb-4">
                            <PrimeImage 
                            :pt="{
                                image: { class: 'mt-0 mx-auto mb-5 block shadow-2 w-full h-full object-cover' }
                            }" preview :src="product.avatar ? apiUrl.public.apiBase + product.avatar : '/image/avatar-default-icon.png'" :alt="product.avatar" width="150" />
                       </div>
                        <label v-if="!product.avatar" for="avatar" class="mb-4">Avatar</label>
                        <input type="file" accept="image/*" @change="onUpload" :maxFileSize="1000000">
                        <!-- <PrimeFileUpload 
                        :pt="{
                            root: { class: 'bg-transparent' }
                        }"
                        @uploader="onUpload"
                        mode="basic" accept="image/*" url="/api/upload" :maxFileSize="1000000"  class="mr-2 inline-block"/> -->
                    </div>
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="name">Name</label>
                        <PrimeInputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="username">User name</label>
                        <PrimeInputText id="username" v-model.trim="product.username" required="true" autofocus :class="{ 'p-invalid': submitted && !product.username }" />
                        <small class="p-invalid" v-if="submitted && !product.username">Username is required.</small>
                    </div>
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="email">Email</label>
                        <PrimeInputText id="email" v-model.trim="product.email" required="true" autofocus :class="{ 'p-invalid': submitted && !product.email }" />
                        <small class="p-invalid" v-if="submitted && !product.email">Email is required.</small>
                    </div>
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="phone">Phone number</label>
                        <PrimeInputText id="phone" v-model.trim="product.phone" required="true" autofocus />
                    </div>
                    <template #footer>
                        <PrimeButton label="Cancel" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="hideDialog"
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }" />
                        <PrimeButton label="Save" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="saveProduct" 
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }"/>
                    </template>
                </PrimeDialog>

                <PrimeDialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Bạn có chắc là muốn xóa <b>{{ product.name }}</b
                            > không?</span
                        >
                    </div>
                    <template #footer>
                        <PrimeButton label="No" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="deleteProductDialog = false" 
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }"/>
                        <PrimeButton label="Yes" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="deleteProduct" 
                        :pt="{ 
                            label: { class: 'font-semibold' } 
                        }"
                        />
                    </template>
                </PrimeDialog>

                <PrimeDialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Bạn có muốn xóa những users đã chọn không?</span>
                    </div>
                    <template #footer>
                        <PrimeButton label="No" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="deleteProductsDialog = false" 
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }"/>
                        <PrimeButton label="Yes" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="deleteSelectedProducts" 
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }"/>
                    </template>
                </PrimeDialog>
            </div>
        </div>
    </div>
</template>
