<template>
  <div class="comment-index">
    <CommentList :filter="filter" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { socket } from '@/app/app.service';
import { mapGetters, mapMutations } from 'vuex';
import CommentList from '@/comment/index/components/comment-list.vue';

export default defineComponent({
  name: 'CommentIndex',

  created() {
    socket.on('commentCreated', this.onCommentCreated);
    socket.on('commentUpdated', this.onCommentUpdated);
    socket.on('commentDeleted', this.onCommentDeleted);
    socket.on('commentReplyCreated', this.onCommentReplyCreated);
    socket.on('commentReplyDeleted', this.onCommentReplyDeleted);
  },

  unmounted() {
    socket.off('commentCreated', this.onCommentCreated);
    socket.off('commentUpdated', this.onCommentUpdated);
    socket.off('commentDeleted', this.onCommentDeleted);
    socket.off('commentReplyCreated', this.onCommentReplyCreated);
    socket.off('commentReplyDeleted', this.onCommentReplyDeleted);
  },

  computed: {
    ...mapGetters({
      sideSheetProps: 'layout/sideSheetProps',
    }),

    filter() {
      return this.sideSheetProps.filter;
    },
  },

  methods: {
    ...mapMutations({
      addCommentItem: 'comment/index/addCommentItem',
      setCommentContent: 'comment/index/setCommentContent',
      removeCommentItem: 'comment/index/removeCommentItem',
      increaseTotalReplies: 'comment/index/increaseTotalReplies',
      decreaseTotalReplies: 'comment/index/decreaseTotalReplies',
    }),

    onCommentCreated({ comment, socketId }) {
      if (socketId === socket.id) {
        return;
      }

      this.addCommentItem(comment);
    },

    onCommentUpdated({ comment, socketId }) {
      if (socketId === socket.id) {
        return;
      }

      this.setCommentContent(comment);
    },

    onCommentDeleted({ comment, socketId }) {
      if (socketId === socket.id) {
        return;
      }

      this.removeCommentItem(comment.id);
    },

    onCommentReplyCreated({ reply, socketId }) {
      if (socketId === socket.id) {
        return;
      }

      this.increaseTotalReplies(reply.replyedComment.id);
    },

    onCommentReplyDeleted({ reply, socketId }) {
      if (socketId === socket.id) {
        return;
      }

      this.decreaseTotalReplies(reply.replyedComment.id);
    },
  },

  components: { CommentList },
});
</script>

<style scoped>
@import './styles/comment-index.css';
</style>
