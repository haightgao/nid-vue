<template>
  <div :class="postListItemMediaClasses">
    <router-link class="link" :to="itemLinkTo">
      <img class="image" :src="item.file.size.medium" :alt="item.title" />
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostListItemMedia',
  props: {
    item: {
      type: Object,
    },

    aspectRatio:{
      type: String,
      default: '3-2'
    }
  },
  computed: {
    itemLinkTo() {
      return { name: 'postShow', params: { postId: this.item.id } };
    },
    postListItemMediaClasses() {
      return [
        'post-list-item-media', this.item.file.orientation,`aspect-ratio-${this.aspectRatio}`,];

    },
  },
});
</script>

<style scoped>
@import './styles/post-list-item-media.css';
</style>
