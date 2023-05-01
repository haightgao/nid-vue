<template>
  <div class="reply-index">
    <ReplyList :list="replies(comment.id)" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import ReplyList from '@/reply/index/components/reply-list.vue';

export default defineComponent({
  name: 'ReplyIndex',
  components: { ReplyList },

  props: {
    comment: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      loading: 'reply/index/loading',
      replies: 'reply/index/replies',
    })
  },

  created() {
    this.getReplies(this.comment.id)
  },

  methods: {
    ...mapActions({
      getReplies: 'reply/index/getReplies'
    })
  }
})
</script>

<style scoped>
@import "./styles/reply-index.css";
</style>