<template>
  <div class="reply-list-item-actions">
    <div class="action" v-if="showOwnReplyOperation">
      <button class="button basic" @click="onClickDeleteButton">{{deleteButtonText}}</button>
    </div>
    <div class="action" v-if="showOwnReplyOperation">
      <button class="button basic" @click="onClickUpdateButton">{{updateButtonText}}</button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters,mapMutations,mapActions} from 'vuex';

export default defineComponent({
  name: 'ReplyListItemActions',

  props: {
    item: {
      type: Object
    },
    showOperation: {
      type: Boolean
    },
    comment: {
      type: Object
    },
    isEditing: {
      type: Boolean
    }
  },

  data(){
    return {
      confirmDelete: false
    }
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser'
    }),

    showOwnReplyOperation() {
      return this.currentUser && this.currentUser.id === this.item.user.id && this.showOperation;
    },
    deleteButtonText() {
      return this.confirmDelete ? '确定删除' : '删除';
    },

    updateButtonText(){
      return this.isEditing ? '取消编辑': '编辑'
    }
  },

  emits: ['editing'],

  methods: {
    ...mapMutations({
      removeReplyItem: 'reply/index/removeReplyItem',
      decreaseTotalReplies: 'comment/index/decreaseTotalReplies'
    }),

    ...mapActions({
      deleteComment: 'comment/destroy/deleteComment',
      pushMessage: 'notification/pushMessage'
    }),

    async onClickDeleteButton(){
      if(this.confirmDelete){
        try{
          await this.deleteComment({commentId: this.item.id})
          this.removeReplyItem({
            commentId: this.comment.id,
            replyId: this.item.id
          })

          this.decreaseTotalReplies(this.comment.id)
        }catch (e){
          await this.pushMessage({ content: e.data.message })
        }
      }

      this.confirmDelete = !this.confirmDelete
    },

    onClickUpdateButton(){
      this.$emit('editing')
    }
  }
})
</script>

<style scoped>
@import "./styles/reply-list-item-actions.css";
</style>