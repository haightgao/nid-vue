<template>
  <div class="reply-index">
    <ReplyList :list="replies(comment.id)" :comment="comment" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { socket } from '@/app/app.service';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ReplyList from '@/reply/index/components/reply-list.vue';

export default defineComponent({
  name: 'ReplyIndex',
  components: { ReplyList },

  props: {
    comment: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      loading: 'reply/index/loading',
      replies: 'reply/index/replies',
    }),
  },

  created() {
    this.getReplies(this.comment.id);

    socket.on('commentReplyCreated', this.onCommentReplyCreated);
    socket.on('commentReplyDeleted', this.onCommentReplyDeleted);
    socket.on('commentReplyUpdated', this.onCommentUpdated);
  },

  unmounted() {
    socket.off('commentReplyCreated', this.onCommentReplyCreated);
    socket.off('commentReplyDeleted', this.onCommentReplyDeleted);
    socket.off('commentReplyUpdated', this.onCommentUpdated);
  },

  methods: {
    ...mapMutations({
      addReplyItem: 'reply/index/addReplyItem',
      removeReplyItem: 'reply/index/removeReplyItem',
      setReplyItemContent: 'reply/index/setReplyItemContent',
    }),

    ...mapActions({
      getReplies: 'reply/index/getReplies',
    }),

    onCommentReplyCreated({ reply, socketId }) {
      if (socketId === socket.id) return;

      this.addReplyItem(reply);
    },

    onCommentReplyDeleted({ reply, socketId }) {
      if (socketId === socket.id) return;

      const {
        id: replyId,
        repliedComment: { id: commentId },
      } = reply;
      this.removeReplyItem({
        replyId,
        commentId,
      });
    },

    onCommentUpdated({ socketId, reply }) {
      if (socket.id === socketId) return;

      this.setReplyItemContent(reply);
    },
  },
});
</script>

<style scoped>
@import './styles/reply-index.css';
</style>
