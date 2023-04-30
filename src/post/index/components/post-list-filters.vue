<template>
  <div class="post-list-filters">
    <div class="post-list-filter" v-for="(filter, index) in filters" :key="index">
      <div class="title">{{filter.title}}</div>
      <div class="value">{{filter.value}}</div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PostListFilter',

  props: {
    filters: {
      type: Object,
    }
  }
})
</script>

<style scoped>
@import "./styles/post-list-filters.css";
</style>