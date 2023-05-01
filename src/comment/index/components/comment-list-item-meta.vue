<template>
  <div class="comment-list-item-meta">
    <UserName :user="item.user" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'CommentListItemMeta',

  props: {
    item: {
      type: Object
    }
  },

  components: { UserName },
})
</script>

<style scoped>
@import "./styles/comment-list-item-meta.css";
</style>