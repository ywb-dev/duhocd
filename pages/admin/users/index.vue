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
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);
const apiUrl = useRuntimeConfig()
const getUsers = () => {
    userStore.getUsers().then((data) => {
        users.value = data;
    });
}

onBeforeMount(() => {
    initFilters();
});

onMounted(() => {
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

const saveProduct = () => {
    submitted.value = true;   

    if (product.value.email && product.value.email.trim() && product.value.username) {
        if (product.value.id) {
            users.value[findIndexById(product.value.id)] = product.value;

            userStore.editUser(product.value.id, product.value).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Edited', life: 3000 });  
                getUsers()
            }).catch((errors) => {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });  
                console.log(errors)
            })
        } else {
            product.value.id = createId();
            // users.value.push(product.value);
            userStore.createUser(product.value).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });  
                getUsers()
            }).catch((errors) => {
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
    deleteProductDialog.value = false;
    product.value = {};
    userStore.deleteUser(product.id)
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    users.value = users.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const onAdvancedUpload = (e) => {
    console.log('e:', e.target)
}

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
                        <div class="flex flex-PrimeColumn md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Manage Users</h5>
                            <!-- <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <PrimeInputText v-model="filters['global'].value" placeholder="Search..." />
                            </span> -->
                        </div>
                    </template>

                    <PrimeColumn selectionMode="multiple" headerStyle="width: 3rem"></PrimeColumn>
                    <PrimeColumn field="id" header="Id" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.id }}
                        </template>
                    </PrimeColumn>
                    <PrimeColumn header="Image" headerStyle="width:14%; min-width:10rem;" >
                        <template #body="slotProps">
                            <img :src="slotProps.data.avatar ? apiUrl.public.apiBase + slotProps.data.avatar : '/'" alt="avatar" class="shadow-2" width="100" />
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="username" header="username" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.username }}
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="email" header="Emails" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.email }}
                        </template>
                    </PrimeColumn>
                    <!-- <PrimeColumn field="phone" header="Phone" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            {{ slotProps.data.phone }}
                        </template>
                    </PrimeColumn> -->
                    <PrimeColumn field="roles" header="role" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span :class="'product-badge role-' + (slotProps.data.roles ? slotProps.data.roles.toLowerCase() : '')">{{ slotProps.data.roles }}</span>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="status" header="status" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <span :class="'product-badge role-' + (slotProps.data.status ? slotProps.data.roles.toLowerCase() : '')">{{ slotProps.data.roles }}</span>
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
                    <div class="filed mb-4">
                        <label for="avatar">Avatar</label>
                        <PrimeFileUpload
                            id="avatar"
                            name="demo[]"
                            url="./upload.php"
                            :multiple="true"
                            accept="image/*"
                            :maxFileSize="1000000"
                            @upload="onAdvancedUpload($event)"
                            :pt="{
                                content: { class: 'surface-ground' }
                            }"
                        >
                            <template #empty>
                                <p>Drag and drop files to here to upload.</p>
                            </template>
                        </PrimeFileUpload>
                    </div>
                    <div class="field">
                        <label for="name">Name</label>
                        <PrimeInputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label for="username">User name</label>
                        <PrimeInputText id="username" v-model.trim="product.username" required="true" autofocus :class="{ 'p-invalid': submitted && !product.username }" />
                        <small class="p-invalid" v-if="submitted && !product.username">Username is required.</small>
                    </div>
                    <div class="field">
                        <label for="email">Email</label>
                        <PrimeInputText id="email" v-model.trim="product.email" required="true" autofocus :class="{ 'p-invalid': submitted && !product.email }" />
                        <small class="p-invalid" v-if="submitted && !product.email">Email is required.</small>
                    </div>
                    <div class="field">
                        <label for="phone">Phone number</label>
                        <PrimeInputText id="phone" v-model.trim="product.phone" required="true" autofocus :class="{ 'p-invalid': submitted && !product.phone }" />
                        <small class="p-invalid" v-if="submitted && !product.phone">Phone Number is required.</small>
                    </div>
                    <template #footer>
                        <PrimeButton label="Cancel" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="hideDialog"
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }" />
                        <PrimeButton label="Save" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="saveProduct" 
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }"/>
                    </template>
                </PrimeDialog>

                <PrimeDialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product"
                            >Are you sure you want to delete <b>{{ product.name }}</b
                            >?</span
                        >
                    </div>
                    <template #footer>
                        <PrimeButton label="No" icon="pi pi-times" severity="info" outlined class="p-PrimeButton-text" @click="deleteProductDialog = false" 
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }"/>
                        <PrimeButton label="Yes" icon="pi pi-check" severity="info" outlined class="p-PrimeButton-text" @click="deleteProduct" 
                        :pt="{ 
                            label: { class: 'font-bold' } 
                        }"
                        />
                    </template>
                </PrimeDialog>

                <PrimeDialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete the selected products?</span>
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

<style scoped lang="scss"></style>