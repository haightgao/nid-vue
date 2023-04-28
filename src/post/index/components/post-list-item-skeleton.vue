<template>
  <div :class="postListItemClasses">
    <div class="post-list-item-media">1</div>
    <div class="post-list-item-content" v-if="showPostListItemContent">
      <div class="thumbnail"></div>
      <div class="header">
        <div class="text"></div>
        <div class="meta"></div>
      </div>
      <div class="actions">
        <div class="action"></div>
        <div class="action"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PostListItemSkeleton',

  computed: {
    ...mapGetters({
      layout: 'post/index/layout',
    }),
    postListItemClasses() {
      return ['post-list-item', 'skeleton', this.layout];
    },
    showPostListItemContent() {
      return !this.layout.includes('-minimal');
    },
  },
});
</script>

<style scoped>
@import './styles/post-list-item-skeleton.css';
</style>
