<template>
  <div class="comment-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user"/>
    </div>
    <div class="content">
      <CommentListItemMeta :item="item" />
      <CommentListItemContent :item="item" />
      <CommentListItemActions :item="item" @toggle-replies="onToggleReplies" />
      <ReplyIndex :comment="item" v-if="showReplies" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import CommentListItemMeta from '@/comment/index/components/comment-list-item-meta.vue';
import CommentListItemContent from '@/comment/index/components/comment-list-item-content.vue';
import CommentListItemActions from '@/comment/index/components/comment-list-item.actions.vue';
import ReplyIndex from '@/reply/index/reply-index.vue';

export default defineComponent({
  name: 'CommentListItem',

  props: {
    item: {
      type: Object
    }
  },

  data(){
    return {
      showReplies: false,
    }
  },

  methods: {
    onToggleReplies(data){
      this.showReplies = data;
    }
  },

  components: { ReplyIndex, CommentListItemActions, CommentListItemContent, CommentListItemMeta, UserAvatar },
});
</script>

<style scoped>
@import "./styles/comment-list-item.css";
</style>