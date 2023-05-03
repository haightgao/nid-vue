<template>
  <div class="manage-post-list-item skeleton">
    <div class="manage-post-list-item-media skeleton">
      <div class="image"></div>
    </div>
    <div class="manage-post-list-item-content skeleton">
      <div class="thumbnail"></div>
      <div class="meta"></div>
      <div class="header">
        <div class="text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ManagePostListItemSkeleton'
})
</script>

<style scoped>
@import "./styles/manage-post-list-item-skeleton.css";
</style>