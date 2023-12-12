
<template>
    <!-- <div class="megaMenu relative">
        <div class="root_menu" v-for="item1 in items">
            <NuxtLink class="" to="">{{ item1?.label }}</NuxtLink>
            <template v-if="item1?.items.length">
                <div class="boxMenu">
                    <template>
     
                    </template>
                    <div class="submenu_1" v-for="item2 in item1.items">
                        <div>Level 1</div>
                        <div>Level 1</div>
                        <div>Level 1</div>
                        <div>Level 1</div>
                    </div>
                    <div class="submenu_2">
                        <div>Level 2</div>
                        <div>Level 2</div>
                        <div>Level 2</div>
                        <div>Level 2</div>
                    </div>
                </div>
            </template>
        </div>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';

    const items = ref([
        { 
            label: 'Thông Tin Du Học',
            items: [
                {
                    label: 'level-2',
                    items: [
                        { label: 'level-3' },
                        { label: 'level-3' },
                        { label: 'level-3' },
                        { label: 'level-3' },
                    ]
                },
                {
                    label: 'level-2'
                },
                {
                    label: 'level-2'
                }
            ]
        },
        { 
          label: 'Yêu cầu tư vấn',
          items: [
                {
                    label: 'level-2',
                    items: [
                        { label: 'level-3' },
                        { label: 'level-3' },
                        { label: 'level-3' },
                        { label: 'level-3' },
                    ]
                },
                {
                    label: 'level-2'
                },
                {
                    label: 'level-2'
                }
            ]
        },
        { label: 'Thông Tin Du Học' }
    ])

// Hàm đệ quy để lấy tất cả các mục từ mọi cấp độ
const getAllItems = (levelItems) => {
  let allItems = [];

  for (const item of levelItems) {
    allItems.push(item);

    if (item.items && item.items.length > 0) {
      // Nếu có mục con, gọi đệ quy để lấy mục của cấp độ dưới
      allItems = allItems.concat(getAllItems(item.items));
    }
  }

  return allItems;
};

// Sử dụng hàm để lấy tất cả các mục từ mọi cấp độ
const allItems = getAllItems(items.value);

console.log('allItems:', allItems)
</script>
