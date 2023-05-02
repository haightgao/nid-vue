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

      <div class="action">
        <div class="icon">
          <button class="button basic" @click="onClickCommentButton">
            <AppIcon name="comment" />
          </button>
        </div>
        <div class="text">
          {{ item.totalComments }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {mapMutations} from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import AppIcon from '@/app/components/app-icon.vue';
import PostLikeAction from '@/post/components/post-like-action.vue';

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
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps'
    }),
    onClickCommentButton(){
      this.setSideSheetComponent('CommentSideSheet');
      this.setSideSheetProps({filter: {post: this.item.id}});
    }
  },

  components: { PostLikeAction, UserAvatar, UserName, AppIcon },
});
</script>

<style scoped>
@import './styles/post-list-item-content.css';
</style>
