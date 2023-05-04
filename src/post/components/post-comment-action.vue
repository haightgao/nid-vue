<template>
  <div class="post-comment-action">
      <div class="icon">
        <button class="button basic" @click="onClickCommentButton">
          <AppIcon name="comment" />
        </button>
      </div>
      <div class="text" v-if="post.totalComments">
        {{post.totalComments}}
      </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapActions, mapMutations} from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostCommentAction',

  props: {
    post: {
      type: Object
    },

    actionType: {
      type: String
    }
  },

  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps'
    }),

    ...mapActions({
      openSideSheet: 'layout/openSideSheet',
      switchSideSheet: 'layout/switchSideSheet'
    }),

    onClickCommentButton(){
      this.setSideSheetComponent('CommentSideSheet')
      this.setSideSheetProps({
        filter: {
          post: this.post.id
        }
      })
      if(this.actionType === 'switch'){
        this.switchSideSheet()
      }else{
        this.openSideSheet()
      }
    }
  },

  components:{AppIcon}
})
</script>

<style scoped>
@import "./styles/post-comment-action.css";
</style>