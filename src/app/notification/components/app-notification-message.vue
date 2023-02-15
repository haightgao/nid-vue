<template>
  <div class="app-notification-message">
    <div class="icon">
      <AppIcon :name="messageIcon" />
    </div>
    <div class="content">{{message.content}}</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export  default defineComponent({
  name: 'AppNotificationMessage',

  props: {
    message: {
      type: Object
    }
  },

  computed: {
    messageIcon(){
     return this.message.icon ? this.message.icon : 'info';
    }
  },

  components: {AppIcon}
})
</script>

<style scoped>
@import './styles/app-notification-message.css';
</style>