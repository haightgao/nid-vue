<template>
  <div class="comment-list">
    <CommentListItem v-for="item in comments" :key="item.id" :item="item"/>
    <template v-if="loading">
      <CommentListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import CommentListItem from '@/comment/index/components/comment-list-item.vue';
import CommentListItemSkeleton from '@/comment/index/components/comment-list-item-skeleton.vue';

export default defineComponent({
  name: 'CommentList',
  components: { CommentListItemSkeleton, CommentListItem },
  props: {
    filter: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      loading: 'comment/index/loading',
      comments: 'comment/index/comments',
      hasMore: 'comment/index/hasMore',
      sideSheetTouchdown: 'layout/sideSheetTouchdown',
      userShowTouchDown: 'user/show/touchDown'
    })
  },

  async created() {
   await this.getComments({filter: this.filter})
  },

  watch: {
    filter(){
      this.getComments({filter: this.filter})
    },

    sideSheetTouchdown(newValue) {

      if(newValue && this.hasMore && !this.loading){
       try{
         console.log('watch sideSheetTouchdown')
         this.getComments({filter: this.filter})
       } catch (error){
         this.pushMessage({content: error.data.message})
       }
      }
    },

    userShowTouchDown(newValue) {

      if(newValue && this.hasMore && !this.loading){
        try{
          console.log('watch sideSheetTouchdown')
          this.getComments({filter: this.filter})
        } catch (error){
          this.pushMessage({content: error.data.message})
        }
      }
    }

  },

  methods: {
    ...mapActions({
      getComments: 'comment/index/getComments',
      pushMessage: 'notification/pushMessage',
    })
  }
});
</script>

<style scoped>
@import "./styles/comment-list.css";
</style>