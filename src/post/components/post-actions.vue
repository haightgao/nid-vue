<template>
  <div class="post-actions">
    <button
      :class="deleteButtonClasses"
      @click="onClickDeleteButton"
      v-if="useDeleteButton"
    >
      {{ deleteButtonText }}
    </button>
    <button
      :class="submitButtonClasses"
      @click="onClickSubmitButton"
      v-if="isLoggedIn"
    >
      {{ submitButtonText }}
    </button>
    <button
      :class="loginButtonClasses"
      @click="onClickLoginButton"
      v-if="!isLoggedIn"
    >
      登录
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'PostActions',

  props: {
    size: {
      type: String,
    },
    useDeleteButton: {
      type: Boolean,
    },
  },

  data() {
    return {
      confirmDelete: false,
      timeoutId: null,
    };
  },

  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
      unsaved: 'post/create/unsaved',
      selectedFile: 'file/create/selectedFile',
      isLoggedIn: 'auth/isLoggedIn',
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
    },

    submitButtonClasses() {
      return ['button', this.size, { outline: this.unsaved }];
    },

    deleteButtonText() {
      return this.confirmDelete ? '确认删除' : '删除';
    },

    deleteButtonClasses() {
      return ['button', this.size, 'red', { outline: !this.confirmDelete }];
    },

    loginButtonClasses() {
      return ['button', 'outline', this.size];
    },
  },

  emits: ['update', 'create', 'delete'],

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onClickSubmitButton() {
      if (!this.selectedFile) {
        return this.pushMessage({ content: '请选择图片' });
      }
      if (!this.title.trim()) {
        return this.pushMessage({ content: '请输入标题' });
      }
      if (this.postId) {
        this.$emit('update');
      } else {
        this.$emit('create');
      }
    },

    onClickDeleteButton() {
      if (this.timeoutId) {
        clearInterval(this.timeoutId);
      }

      if (this.confirmDelete) {
        this.$emit('delete');
      }

      this.confirmDelete = !this.confirmDelete;

      if (this.confirmDelete) {
        this.timeoutId = setTimeout(() => {
          this.confirmDelete = false;
        }, 3000);
      }
    },

    onClickLoginButton() {
      this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style scoped>
@import './styles/post-actions.css';
</style>
