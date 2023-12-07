<script setup lang="ts">
import Editor from 'primevue/editor';
    definePageMeta({
        layout: 'admin'
    });

    const postitle = ref('')
    const editContent = ref('')
    console.log(editContent)

    const selectedAction = ref('Visible');
    const actions = ref([
        { name: 'Visible', key: 'A' },
        { name: 'Hidden', key: 'P' },
    ]);

    const selectedCategory = ref();
    const categories = ref([
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ]);
</script>
<template>
    <div class="relative w-full">   
        <div class="flex flex-wrap">
            <div class="w-full bg-[#f8f9fa] rounded-xl p-8">
                    <div class="flex items-center">
                        <PrimeButton @click="$router.back()" icon="pi pi-arrow-left" severity="info"/>
                        <span class="text-base ml-4">Back to lists</span>
                    </div>
                    <div class="content__wrap flex flex-col lg:flex-row">
                        <div class="flex-1">
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
                            <div class="blog banner p-6 bg-white rounded-xl">
                                <h3 class="mb-2 mt-0">Excerpt</h3>
                                <i>Thêm nôi dung của bài post ở đây để hiển thị ra Home Page or Blog</i>
                                <Editor class="mt-6" v-model="editContent" editorStyle="height: 320px" />
                            </div>
                        </div>
                        <div class="sidebar relative w-full lg:max-w-[300px] mt-6 lg:mt-0 ml-0 lg:ml-6">
                            <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                                <h4 class="mt-0 text-base font-medium">Visibility</h4>
                                <div v-for="action in actions" :key="action.key" class="flex align-items-center mb-4">
                                    <PrimeRadioButton v-model="selectedAction" :inputId="action.key" name="dynamic" :value="action.name" />
                                    <label :for="action.key" class="ml-2 text-sm">{{ action.name }}</label>
                                </div>
                            </div>
                            <div class="w-full rounded-xl p-8 flex flex-col bg-white mb-6">
                                <PrimeDropdown v-model="selectedCategory" editable :options="categories" optionLabel="name" placeholder="category" class="w-full mb-4" />
                                <h4 class="mt-0 text-base font-medium">Feature Image</h4>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
    </div>
</template>
