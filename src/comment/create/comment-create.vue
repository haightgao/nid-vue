<template>
  <div class="comment-create">
    <div class="thumbnail">
      <UserAvatar :user="currentUser" link="login" />
    </div>
    <div class="content">
      <TextareaField
        placeholder="发表评论"
        v-model="content"
        @keydown.stop="onKeyDownCommentTextarea"
        @keyup.stop
      />
      <div class="actions">
        <button
          class="button pill"
          v-if="currentUser"
          @click="onClickCancelButton"
        >
          取消
        </button>
        <button
          class="button pill"
          v-if="currentUser"
          @click="onClickSubmitButton"
        >
          发布
        </button>
        <button
          class="button pill"
          v-if="!currentUser"
          @click="onClickRegisterButton"
        >
          注册
        </button>
        <button
          class="button pill"
          v-if="!currentUser"
          @click="onClickLoginButton"
        >
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import TextareaField from '@/app/components/textarea-field.vue';

export default defineComponent({
  name: 'CommentCreate',
  components: { TextareaField, UserAvatar },

  data() {
    return {
      content: '',
    };
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      sideSheetProps: 'layout/sideSheetProps',
    }),
  },

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
      createComment: 'comment/create/createComment',
    }),
    async submitComment() {
      if (!this.content.trim()) {
        return;
      }

      if (!this.currentUser) {
        await this.pushMessage({ content: '请先登录' });
        return;
      }

      try {
        await this.createComment({
          postId: this.sideSheetProps.filter.post,
          content: this.content,
        });

        this.content = '';
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },
    onClickCancelButton() {
      this.content = '';
    },
    onClickSubmitButton() {
      this.submitComment();
    },
    onClickRegisterButton() {
      this.$router.push({ name: 'login' });
    },
    onClickLoginButton() {
      this.$router.push({ name: 'login' });
    },
    onKeyDownCommentTextarea(event) {
      if (
        (event.ctrlKey && event.key === 'Enter') ||
        (event.metaKey && event.key === 'Enter')
      ) {
        this.submitComment();
      }
    },
  },
});
</script>

<style scoped>
@import './styles/comment-create.css';
</style>
