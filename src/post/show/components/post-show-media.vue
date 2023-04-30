<template>
  <div :class="postShowMediaClasses">
    <img :src="post.file.size.large" alt="" class="image" @load="onLoadImage">
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
  },

  data(){
    return {
      loading: true,
    }
  },

  computed: {
    postShowMediaClasses(){
      return ['post-show-media', {loading: this.loading}]
    }
  },

  methods: {
    onLoadImage(){
      this.loading = false;
    }
  }
})
</script>

<style scoped>
@import "./styles/post-show-media.css";
</style>