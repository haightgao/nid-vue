<template>
  <PostListFilters v-if="filterItems.length" :filters="filterItems" />
  <PostList :sort="sort" :filter="filter" />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PostList from './components/post-list';
import PostListFilters from '@/post/index/components/post-list-filters.vue';
import { socket } from '@/app/app.service';

export default defineComponent({
  props: {
    sort: {
      type: String,
    },
    filter: {
      type: Object,
    },
  },
  title() {
    let title;

    if (this.$route.name === 'postIndexPopular') {
      title = '热门';
    } else {
      title = '最近';
    }
    return title;
  },

  computed: {
    ...mapGetters({
      filterItems: 'post/index/filterItems',
    }),
  },

  created() {
    socket.on('userLikePostCreated', this.onUserLikePostCreated);
    socket.on('userLikePostDeleted', this.onUserLikePostDeleted);
    socket.on('commentCreated', this.onCommentCreated);
    socket.on('commentDeleted', this.onCommentCreated);
  },

  unmounted() {
    socket.off('userLikePostCreated', this.onUserLikePostCreated);
    socket.off('userLikePostDeleted', this.onUserLikePostDeleted);
    socket.off('commentCreated', this.onCommentCreated);
    socket.off('commentDeleted', this.onCommentCreated);
  },

  methods: {
    ...mapMutations({
      setPostItemTotalLikes: 'post/index/setPostItemTotalLikes',
      setPostItemTotalComments: 'post/index/setPostItemTotalComments',
    }),

    onUserLikePostCreated({ postId, socketId }) {
      if (socket.id === socketId) {
        return;
      }

      this.setPostItemTotalLikes({
        postId,
        actionType: 'increase',
      });
    },

    onUserLikePostDeleted({ postId, socketId }) {
      if (socket.id === socketId) return;

      this.setPostItemTotalLikes({
        postId,
        actionType: 'decrease',
      });
    },

    onCommentCreated({ postId, socketId }) {
      if (socket.id === socketId) return;

      this.setPostItemTotalComments({
        postId,
        actionType: 'increase',
      });
    },

    onCommentDeleted({ postId, socketId }) {
      if (socket.id === socketId) return;

      this.setPostItemTotalComments({
        postId,
        actionType: 'decrease',
      });
    },
  },

  components: {
    PostList,
    PostListFilters,
  },
});
</script>
