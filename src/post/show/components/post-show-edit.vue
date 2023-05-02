<template>
  <div class="post-show-edit" v-if="canEdit">
    <router-link :to="editLinkTo" class="button pill">
      编辑
    </router-link>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: 'PostShowEdit',

  props: {
    post: {
      type: Object
    },
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser'
    }),

    editLinkTo(){
      return {
        name: 'postCreate',
        query: {
          post: this.post.id
        }
      }
    },

    canEdit(){
      const ownPost = this.currentUser && this.currentUser.id === this.post.user.id

      const isAdmin = this.currentUser && this.currentUser.id === 1

      return ownPost || isAdmin
    }
  }
})
</script>

<style scoped>
@import "./styles/post-show-edit.css";
</style>