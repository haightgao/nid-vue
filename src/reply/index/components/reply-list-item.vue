<template>
  <div class="reply-list-item">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user" />
    </div>
    <div class="content">
      <ReplyListItemMeta :item="item" />
      <ReplyListItemContent :item="item" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import ReplyListItemMeta from '@/reply/index/components/reply-list-item-meta.vue';
import ReplyListItemContent from '@/reply/index/components/reply-list-item-content.vue';

export default defineComponent({
  name: 'ReplyListItem',

  props: {
    item: {
      type: Object
    }
  },

  components: { ReplyListItemContent, ReplyListItemMeta, UserAvatar },
})
</script>

<style scoped>
@import "./styles/reply-list-item.css";
</style>