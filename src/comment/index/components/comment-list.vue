<template>
  <div class="comment-list">
    <CommentListItem v-for="item in comments" :key="item.id" :item="item"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import CommentListItem from '@/comment/index/components/comment-list-item.vue';

export default defineComponent({
  name: 'CommentList',
  components: { CommentListItem },
  props: {
    filter: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      loading: 'comment/index/loading',
      comments: 'comment/index/comments'
    })
  },

  async created() {
   await this.getComments({filter: this.filter})
  },

  watch: {
    filter(){
      this.getComments({filter: this.filter})
    }
  },

  methods: {
    ...mapActions({
      getComments: 'comment/index/getComments'
    })
  }
});
</script>

<style scoped>
@import "./styles/comment-list.css";
</style>