<template>
  <div class="comment-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user"/>
    </div>
    <div class="content">
      <CommentListItemMeta :item="item" />
      <CommentListItemContent :item="item" />
      <CommentListItemActions :item="item" @toggle-replies="onToggleReplies" />
      <div v-if="showReplies">回复列表</div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import CommentListItemMeta from '@/comment/index/components/comment-list-item-meta.vue';
import CommentListItemContent from '@/comment/index/components/comment-list-item-content.vue';
import CommentListItemActions from '@/comment/index/components/comment-list-item.actions.vue';

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

  components: { CommentListItemActions, CommentListItemContent, CommentListItemMeta, UserAvatar },
});
</script>

<style scoped>
@import "./styles/comment-list-item.css";
</style>