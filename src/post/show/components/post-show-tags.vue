<template>
  <div class="post-show-tags">
    <PostTag v-for="tag in tags" :key="tag.id" :tag="tag"></PostTag>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import PostTag from '@/post/components/post-tag.vue';

export default defineComponent({
  name: 'PostShowTags',

  props: {
    tags: {
      type: Array
    }
  },

  components: {PostTag}
})
</script>

<style scoped>
@import "./styles/post-show-tags.css";
</style>