<template>
  <div class="post-show-content">
    {{ post.content }}
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export  default  defineComponent({
  name: 'PostShowContent',

  props:{
    post: {
      type: Object
    }
  }
})
</script>

<style scoped>
@import "./styles/post-show-content.css";
</style>