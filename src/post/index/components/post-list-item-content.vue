<template>
  <div class="post-list-item-content">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user" />
    </div>
    <div class="header">
      <div class="text">
        <router-link class="link" :to="itemLinkTo">{{
          item.title
        }}</router-link>
      </div>

      <div class="meta">
        <UserName :user="item.user" />
      </div>
    </div>

    <div class="actions">
      <PostLikeAction class="action" :post="item" />
      <PostCommentAction class="action" :post="item" actionType="switch" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import PostLikeAction from '@/post/components/post-like-action.vue';
import PostCommentAction from '@/post/components/post-comment-action.vue';

export default defineComponent({
  name: 'PostListItemContent',

  props: {
    item: Object,
  },
  computed: {
    itemLinkTo() {
      return { name: 'postShow', params: { postId: this.item.id } };
    },
  },

  methods: {
  },

  components: { PostCommentAction, PostLikeAction, UserAvatar, UserName },
});
</script>

<style scoped>
@import './styles/post-list-item-content.css';
</style>
