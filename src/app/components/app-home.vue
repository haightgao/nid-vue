<template>
  <div>欢迎访问宁皓网：）</div>
  <div>{{ isLoggedIn }}</div>
  <button class="button" @click="onClickPushMessageButton">Push Message</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onClickPushMessageButton() {
      this.pushMessage({
        content: 'Push Message',
        icon: 'cloud',
      });
    },
  },
};
</script>
