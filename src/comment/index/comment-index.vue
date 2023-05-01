<template>
  <div class="comment-index">
    <CommentList :filter="filter"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';
import CommentList from '@/comment/index/components/comment-list.vue';

export default defineComponent({
  name: 'CommentIndex',

  computed: {
    ...mapGetters({
      sideSheetProps: 'layout/sideSheetProps'
    }),

    filter(){
      return this.sideSheetProps.filter;
    }
  },

  components: { CommentList },
});
</script>

<style scoped>
@import "./styles/comment-index.css";
</style>