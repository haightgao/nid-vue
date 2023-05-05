<template>
  <div class="app-notification">
    <transition-group name="app-notification-message">
      <AppNotificationMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import AppNotificationMessage from './components/app-notification-message.vue';

export default defineComponent({
  name: 'AppNotification',
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      messages: 'notification/messages',
    }),
  },

  components: {
    AppNotificationMessage,
  },
});
</script>

<style scoped>
.app-notification {
  position: fixed;
  bottom: 64px;
  right: 64px;
  z-index: 666;
}
</style>
