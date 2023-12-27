<template>
  <nav class="flex justify-center w-full items-center py-8 px-6" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item prev-first" :class="{ 'disabled': pagination?.current_page === 1 }">
        <a class="page-link" @click.prevent="changePage(1)" href="#"><i class="pi pi-angle-double-left"></i></a>
      </li>
      <li class="page-item prev" :class="{ 'disabled': pagination?.current_page === 1 }">
        <a class="page-link" @click.prevent="changePage(pagination?.current_page - 1)" href="#"><i
            class="pi pi-chevron-left"></i></a>
      </li>
      <li v-for="page in pages" :key="page" :class="{ 'active': page === pagination?.current_page }"
        class="page-item page-number">
        <a class="page-link" @click.prevent="changePage(page)" href="#">{{ page }}</a>
      </li>
      <li class="page-item next" :class="{ 'disabled': pagination?.current_page === pagination?.last_page }">
        <a class="page-link" @click.prevent="changePage(pagination?.current_page + 1)" href="#"><i
            class="pi pi-chevron-right"></i></a>
      </li>
      <li class="page-item prev-last" :class="{ 'disabled': pagination?.current_page === pagination?.last_page }">
        <a class="page-link" @click.prevent="changePage(pagination?.last_page)" href="#"><i
            class="pi pi-angle-double-right"></i></a>
      </li>
    </ul>
  </nav>
</template>
  
<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true
    }
  },
  computed: {
    pages() {
      let pages = [];
      for (let i = 1; i <= this.pagination?.last_page; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    }
  }
};
</script>
  
<style>
.pagination {
  display: flex;
}

.page-item {
  padding: 4px 10px;
}

.page-item.disabled {
  opacity: 0.4;
  pointer-events: none;
}

.page-item.page-number {
  padding: 0;
}

.page-item i {
  font-size: 12px;
}

.page-number a {
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 99px;
  margin-right: 6px;
  cursor: pointer;
  padding: 0;
}

.page-number:hover a,
.page-number.active a {
  background-color: #67a9e7;
}

.page-number:hover a,
.page-number.active a {
  color: white;
}</style>
  