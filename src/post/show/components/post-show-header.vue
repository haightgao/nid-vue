<template>
  <div class="post-show-header">
    <div class="content">
      <h1 class="text">{{post.title}}</h1>
      <div class="meta">
        <UserName :user="post.user" />
      </div>
    </div>
    <div class="thumbnail">
      <UserAvatar :user="post.user" size="medium" link="user" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'PostShowHeader',

  props:{
    post: {
      type: Object
    }
  },

  components: {
    UserAvatar, UserName
  }
});
</script>

<style scoped>
@import "./styles/post-show-header.css";
</style>