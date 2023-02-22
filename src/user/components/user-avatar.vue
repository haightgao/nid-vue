<template>
  <div :class="userAvatarClasses">
    <router-link class="link" :to="userAvatarLinkTo" v-if="link">
      <img class="image" :src="userAvatarSource" />
    </router-link>
    <img v-else class="image" :src="userAvatarSource" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '@/app/app.config';

export default defineComponent({
  name: 'UserAvatar',

  /**
   * 属性
   */
  props: {
    user: {
      type: Object,
    },
    size: {
      type: String,
      default: 'small',
    },
    link: {
      type: String,
    },
  },

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),

    userAvatarClasses() {
      return [
        'user-avatar',
        this.size,
        { fade: !this.isLoggedIn && !this.user },
      ];
    },

    userAvatarSource() {
      let avatarSource;
      if (this.user && this.user.avatar) {
        avatarSource = `${API_BASE_URL}/users/${this.user.id}/avatar?size=${this.size}`;
      } else {
        avatarSource = `/icons/account-black-32px.svg`;
      }

      return avatarSource;
    },

    userAvatarLinkTo() {
      let linkto;

      if (this.link === 'login' && !this.isLoggedIn) {
        linkto = { name: 'login' };
      } else if (this.user) {
        linkto = { name: 'userShow', params: { userId: this.user.id } };
      } else {
        linkto = '/';
      }
      return linkto;
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/user-avatar.css';
</style>
