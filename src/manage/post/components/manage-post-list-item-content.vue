<template>
  <div class="manage-post-list-item-content">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user" />
    </div>
    <div class="meta">
      <UserName :user="item.user" />
    </div>
    <div class="header">
      <div class="text">
        <router-link :to="itemTitleLinkTo" class="link">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'ManagePostListItemContent',
  components: { UserName, UserAvatar },

  props: {
    item: {
      type: Object
    }
  },

  computed: {
    itemTitleLinkTo(){
      return {
        name: 'postShow',
        params: { postId: this.item.id }
      }
    }
  }
})
</script>

<style scoped>
@import "./styles/manage-post-list-item-content.css";
</style>