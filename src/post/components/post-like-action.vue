<template>
  <div class="post-like-action">
    <div class="icon">
      <button class="button basic" @click="onClickLikeButton">
        <AppIcon :name="likeIcon" />
      </button>
    </div>
    <div class="text" v-if="post.totalLikes">
      {{ post.totalLikes }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostLikeAction',

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),

    likeIcon() {
      return this.post.liked ? 'favorite' : 'favorite_border';
    },
  },

  methods: {
    ...mapActions({
      createUserLikePost: 'like/create/createUserLikePost',
      deleteUserLikePost: 'like/destroy/deleteUserLikePost',
      pushMessage: 'notification/pushMessage',
    }),

    onClickLikeButton() {
      if (!this.isLoggedIn) {
        this.pushMessage({ content: '请先登录' });
        return;
      }

      if (this.post.liked) {
        this.deleteUserLikePost({ postId: this.post.id });
      } else {
        this.createUserLikePost({ postId: this.post.id });
      }
    },
  },

  components: { AppIcon },
});
</script>

<style scoped>
@import './styles/post-like-action.css';
</style>
