<template>
  <div class="comment-list-item skeleton">
    <div class="thumbnail"></div>
    <div class="content">
      <div class="comment-list-item-meta skeleton"></div>
      <div class="comment-list-item-content skeleton"></div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CommentListItemSkeleton'
})
</script>

<style scoped>
@import "./styles/comment-list-item-skeleton.css";
</style>