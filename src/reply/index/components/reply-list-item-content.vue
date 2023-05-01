<template>
  <div class="reply-list-item-content">
    {{item.content}}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ReplyListItemContent',

  props: {
    item: {
      type: Object
    }
  }
})
</script>

<style scoped>
@import "./styles/reply-list-item-content.css";
</style>