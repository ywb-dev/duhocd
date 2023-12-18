<script setup>
import { FilterMatchMode } from 'primevue/api';
import { onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useCategoryStore } from '~~/stores/category';

definePageMeta({
    layout: 'admin'
})

const toast = useToast();
const categories = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
let stt = 1
const submitted = ref(false);
const categoryStore = useCategoryStore()

const getCategories = () => {
    categoryStore.getCategories().then((data) => {
        categories.value = data;
    });
}

onBeforeMount(() => {
    initFilters();
    getCategories()
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

const saveProduct = async () => {
    submitted.value = true; 
    const formData = new FormData();

    formData.append('name', product.value.name || null);
    formData.append('description', product.value.description || null );

    if (product.value.name && product.value.name.trim()) {
        if (product.value.id) {
            await categoryStore.editCategory(product.value.id, product.value).then((data) => {
                console.log('data:', data)
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Edited', life: 3000 });  
                getCategories()
            }).catch(function(errors) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'Xảy ra lỗi', life: 3000 });  
                console.log(errors)
            })
        } else {        
            await categoryStore.createCategory(formData).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });  
                getCategories()
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
    categories.value = categories.value.filter((val) => val.id !== product.value.id);
    categoryStore.deleteCategory(product.value.id).then(()=> {
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
    categories.value = categories.value.filter((val) => {
       return !selectedProducts.value.includes(val)
    });

    const userIds = selectedProducts.value.map(user => user.id);
  
    categoryStore.deleteSelectCategory(userIds).then(()=> {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Category đã xóa thành công', life: 3000 });
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
                    :value="categories"
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
                            <h5 class="m-0 text-xl mb-1.5">Manage Categories</h5>
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
                    <PrimeColumn field="name" header="Name" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Name: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.name }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="description" header="Description" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Description: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.description }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="created" header="Created at" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">created: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.created_at }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn field="updated" header="Updated at" :sortable="true" headerStyle="width:14%; min-width:10rem;">
                        <template #body="slotProps">
                            <div class="flex items-center">
                                <span class="md:hidden font-bold absolute">Updated at: </span>
                                <span class="ml-32 md:ml-0">{{ slotProps.data.updated_at }}</span>
                            </div>
                        </template>
                    </PrimeColumn>
                    <PrimeColumn headerStyle="min-width:10rem;" header="Actions">
                        <template #body="slotProps">
                            <PrimeButton severity="info" icon="pi pi-pencil" class="p-PrimeButton-rounded p-PrimeButton-success mr-2" @click="editProduct(slotProps.data)" 
                            :pt="{ 
                                root: { class: 'bg-primary' } 
                            }"/>
                            <PrimeButton severity="danger" icon="pi pi-trash" class="p-PrimeButton-rounded p-PrimeButton-warning mt-2" @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </PrimeColumn>
                </PrimeDataTable>

                <PrimeDialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Category Details" :modal="true" class="p-fluid">
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="name">Name</label>
                        <PrimeInputText id="name" v-model.trim="product.name" required="true" autofocus :class="{ 'p-invalid': submitted && !product.name }" />
                        <small class="p-invalid" v-if="submitted && !product.name">Name is required.</small>
                    </div>
                    <div class="field">
                        <label class="block mb-0.5 text-sm" for="description">Description</label>
                        <PrimeInputText id="description" v-model.trim="product.description" required="false" autofocus :class="{ 'p-invalid': submitted && !product.description }" />
                        <small class="p-invalid" v-if="submitted && !product.description">Description is required.</small>
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
                        <span v-if="product">Bạn có muốn xóa những categories đã chọn không?</span>
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
