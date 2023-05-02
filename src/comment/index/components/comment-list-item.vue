<template>
  <div class="comment-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user"/>
    </div>
    <div class="content">
      <CommentListItemMeta :item="item" />
      <CommentListItemContent
        v-if="!isEditing"
        :item="comment"
        @click="onClickCommentListItemContent" />
      <CommentEdit v-if="isEditing" :comment="item" @updated="onUpdatedComment" />
      <CommentListItemActions
        :item="item"
        @toggle-replies="onToggleReplies"
        :showOperation="showOperation"
        @editing="onEditingComment"
        :isEditing="isEditing"
        @replying="onReplyingComment"
        :isReplying="isReplying"
      />
      <ReplyCreate v-if="isReplying" :comment="item" :showReplies="showReplies"/>
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
import CommentEdit from '@/comment/edit/comment-edit.vue';
import ReplyCreate from '@/reply/create/reply-create.vue';

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
      showOperation: false,
      isEditing: false,
      isReplying: false,
      comment: this.item
    }
  },

  methods: {
    onToggleReplies(data){
      this.showReplies = data;
    },

    onClickCommentListItemContent(){
      this.showOperation = !this.showOperation
    },

    onEditingComment(){
      this.isEditing = !this.isEditing
    },

    onUpdatedComment(data){
      this.comment.content = data
      this.isEditing = false
    },

    onReplyingComment(){
      this.isReplying = !this.isReplying
    }
  },

  components: { ReplyCreate, CommentEdit, ReplyIndex, CommentListItemActions, CommentListItemContent, CommentListItemMeta, UserAvatar },
});
</script>

<style scoped>
@import "./styles/comment-list-item.css";
</style>