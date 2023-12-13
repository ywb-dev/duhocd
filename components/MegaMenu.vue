<template>
    <div class="mega-menu hidden lg:block desktop">
      <ul class="block mx-10 flex relative border-b border-textPrimary">
        <menu-item v-for="(item, index) in items" :key="item?.label" :item="item" :index="index" :is-root="true"></menu-item>
      </ul>
    </div>
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
                        { label: 'level-3-1' },
                        { label: 'level-3-1' },
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
                        { label: 'level-3-2' },
                        { label: 'level-3-2' },
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
</script>