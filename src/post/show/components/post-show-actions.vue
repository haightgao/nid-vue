<template>
  <div class="post-show-actions">
    <div class="action">
      <div class="icon">
        <AppIcon name="favorite" />
      </div>
      <div class="text">
        {{post.totalLikes}}
      </div>
    </div>
    <div class="action">
      <div class="icon">
        <button class="button basic" @click="onClickCommentButton">
          <AppIcon name="comment" />
        </button>
      </div>
      <div class="text">
        {{post.totalComments}}
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapMutations} from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostShowActions',

  props:{
    post: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent'
    })
  },

  created() {
    if(this.sideSheetComponent){
      this.setSideSheetProps({
        filter: {
          post: this.post.id
        }
      })
    }
  },

  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      resetSideSheet: 'layout/resetSideSheet',
      setSideSheetProps: 'layout/setSideSheetProps'
    }),
    onClickCommentButton(){
      if(this.sideSheetComponent){
        this.resetSideSheet();
      }else {
        this.setSideSheetComponent('CommentSideSheet');
        this.setSideSheetProps({
          filter: {
            post: this.post.id
          }
        })
      }
    }
  },

  components: {AppIcon}
})
</script>

<style scoped>
@import "./styles/post-show-actions.css";
</style>