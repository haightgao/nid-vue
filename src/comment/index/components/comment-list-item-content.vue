<template>
  <div class="comment-list-item-content">
    {{item.content}}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CommentListItemContent',

  props: {
    item: {
      type: Object
    }
  }
})
</script>

<style scoped>
@import "./styles/comment-list-item-content.css";
</style>