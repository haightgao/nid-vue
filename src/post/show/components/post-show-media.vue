<template>
  <div class="post-show-media">
    <img :src="post.file.size.large" alt="" class="image">
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PostShowMedia',

  props: {
    post: {
      type: Object
    }
  }
})
</script>

<style scoped>
@import "./styles/post-show-media.css";
</style>