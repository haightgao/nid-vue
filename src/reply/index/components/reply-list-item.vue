<template>
  <div class="reply-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user" />
    </div>
    <div class="content">
      <ReplyListItemMeta :item="item" />
      <ReplyListItemContent :item="reply" @click="onClickReplyListItemContent" />
      <CommentEdit v-if="isEditing" :comment="item" @updated="onUpdatedReply" />
      <ReplyListItemActions :item="item" :showOperation="showOperation" :comment="comment" :isEditing="isEditing" @editing="onEditingReply" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import ReplyListItemMeta from '@/reply/index/components/reply-list-item-meta.vue';
import ReplyListItemContent from '@/reply/index/components/reply-list-item-content.vue';
import ReplyListItemActions from '@/reply/index/components/reply-list-item-actions.vue';
import CommentEdit from '@/comment/edit/comment-edit.vue';

export default defineComponent({
  name: 'ReplyListItem',

  props: {
    item: {
      type: Object
    },
    comment: {
      type: Object
    }
  },

  data(){
    return {
      showOperation: false,
      reply: this.item,
      isEditing: false,
    }
  },

  methods: {
    onClickReplyListItemContent(){
      this.showOperation = !this.showOperation
    },
    onUpdatedReply(data){
      this.reply.content = data
      this.isEditing = false
    },
    onEditingReply(){
      this.isEditing = !this.isEditing
    },
  },

  components: { CommentEdit, ReplyListItemActions, ReplyListItemContent, ReplyListItemMeta, UserAvatar },
})
</script>

<style scoped>
@import "./styles/reply-list-item.css";
</style>