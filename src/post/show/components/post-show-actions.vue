<template>
  <div class="post-show-actions">
    <PostLikeAction class="action" :post="post" />
    <PostCommentAction class="action" :post="post" actionType="switch" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PostLikeAction from '@/post/components/post-like-action.vue';
import PostCommentAction from '@/post/components/post-comment-action.vue';

export default defineComponent({
  name: 'PostShowActions',

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
    }),
  },

  created() {
    this.setSideSheetComponent('CommentSideSheet');
    if (this.sideSheetComponent) {
      this.setSideSheetProps({
        filter: {
          post: this.post.id,
        },
      });
    }
  },

  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),
  },

  components: { PostCommentAction, PostLikeAction },
});
</script>

<style scoped>
@import './styles/post-show-actions.css';
</style>
