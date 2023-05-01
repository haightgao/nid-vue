<template>
  <div class="reply-list">
    <ReplyListItem v-for="reply in list" :key="reply.id" :item="reply" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ReplyListItem from '@/reply/index/components/reply-list-item.vue';

export default defineComponent({
  name: 'ReplyList',
  components: { ReplyListItem },

  props: {
    list: {
      type: Array
    }
  }
})
</script>

<style scoped>
@import "./styles/reply-list.css";
</style>