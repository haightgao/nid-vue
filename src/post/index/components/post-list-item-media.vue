<template>
  <div class="post-list-item-media">
    <router-link class="link" :to="itemLinkto">
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
  },
  computed: {
    itemLinkto() {
      return { name: 'postShow', params: { postId: this.item.id } };
    },
  },
});
</script>

<style scoped>
@import './styles/post-list-item-media.css';
</style>
