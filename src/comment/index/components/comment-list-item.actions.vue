<template>
  <div class="comment-list-item-actions">
    <div class="actions" v-if="item.totalReplies">
      <button class="button basic" @click="onClickTotalRepliesButton">
        {{item.totalReplies}} 条回复
        <AppIcon :name="totalRepliesIconName" />
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'CommentListItemActions',
  components: { AppIcon },

  props: {
    item: {
      type: Object
    }
  },

  data(){
    return {
      showReplies: false
    }
  },

  computed: {
    totalRepliesIconName(){
      return this.showReplies ? 'arrow_drop_up': 'arrow_drop_down'
    }
  },

  emits: ['toggle-replies'],

  methods: {
    onClickTotalRepliesButton(){
      this.showReplies = !this.showReplies
      this.$emit('toggle-replies', this.showReplies)
    }
  }
})
</script>

<style scoped>
@import "./styles/comment-list-item-actions.css";
</style>