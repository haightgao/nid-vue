<template>
  <div class="post-meta">
    <div class="actions">
      <router-link class="link" to="previewLinkTo">
        -> 查看 "<i>{{post.title}}</i>"
      </router-link>
    </div>
    <div class="meta">
      <UserAvatar :user="post.user" link="user" />
      <UserName :user="post.user" />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'PostMeta',

  props: {
    post: {
      type: Object
    }
  },

  computed: {
    previewLinkTo(){
      return {
        name: 'postShow',
        params: {
          postId: this.post.id
        }
      }
    }
  },

  components: { UserName, UserAvatar },
})
</script>

<style scoped>
@import "./styles/post-meta.css";
</style>