<template>
  <div class="comment-list-item-content">
    <div class="quote" v-if="item.repliedComment">
      {{ item.repliedComment.content }}
    </div>
    <div class="content">
      {{item.content}}
    </div>
    <div class="meta" v-if="item.post">
      <router-link class="link" :to="postTitleLinkTo">
        # {{ item.post.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CommentListItemContent',

  props: {
    item: {
      type: Object
    }
  },

  computed: {
    postTitleLinkTo(){
      return {
        name: 'postShow',
        params: {
          postId: this.item.post.id
        }
      }
    }
  }
})
</script>

<style scoped>
@import "./styles/comment-list-item-content.css";
</style>