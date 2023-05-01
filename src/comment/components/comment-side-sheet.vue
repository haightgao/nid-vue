<template>
  <div class="comment-side-sheet">
    <CommentIndex />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CommentIndex from '@/comment/index/comment-index.vue';

export default defineComponent({
  name: 'CommentSideSheet',
  components: { CommentIndex },
});
</script>

<style scoped>
@import "./styles/comment-side-sheet.css";
</style>