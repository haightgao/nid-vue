<template>
  <div class="comment-side-sheet">
    <CommentCreate />
    <CommentIndex />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CommentIndex from '@/comment/index/comment-index.vue';
import CommentCreate from '@/comment/create/comment-create.vue';

export default defineComponent({
  name: 'CommentSideSheet',
  components: { CommentCreate, CommentIndex },
});
</script>

<style scoped>
@import "./styles/comment-side-sheet.css";
</style>