<template>
  <div class="comment-list-item-actions">
    <div class="actions" v-if="item.totalReplies">
      <button class="button basic" @click="onClickTotalRepliesButton">
        {{item.totalReplies}} 条回复
        <AppIcon :name="totalRepliesIconName" />
      </button>
    </div>
    <div class="action" v-if="!item.repliedComment">
      <button class="button basic" @click="onClickReplyButton">
        {{replyButtonText}}
      </button>
    </div>
    <div class="action" v-if="showOwnCommentOperation">
      <button class="button basic" @click="onClickDeleteButton">
        {{ deleteButtonText }}
      </button>
    </div>
    <div class="action" v-if="showOwnCommentOperation">
      <button class="button basic" @click="onClickUpdateButton">
        {{ updateButtonText }}
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'CommentListItemActions',
  components: { AppIcon },

  props: {
    item: {
      type: Object
    },
    showOperation: {
      type: Boolean
    },
    isEditing: {
      type: Boolean
    },
    isReplying: {
      type: Boolean
    }
  },

  data(){
    return {
      showReplies: false,
      confirmDelete: false,
    }
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),

    totalRepliesIconName(){
      return this.showReplies ? 'arrow_drop_up': 'arrow_drop_down'
    },

    showOwnCommentOperation(){
      return (
        this.currentUser && this.currentUser.id === this.item.user.id && this.showOperation
      )
    },

    deleteButtonText(){
      return this.confirmDelete ? '确认删除' : '删除'
    },

    updateButtonText(){
      return this.isEditing ? '取消编辑' : '编辑'
    },

    replyButtonText(){
      return this.isReplying ? '取消回复': '回复'
    }
  },

  emits: ['toggle-replies','editing','replying'],

  methods: {
    ...mapActions({
      deleteComment: 'comment/destroy/deleteComment',
      pushMessage: 'notification/pushMessage'
    }),

    ...mapMutations({
      removeCommentItem: 'comment/index/removeCommentItem'
    }),

    onClickTotalRepliesButton(){
      this.showReplies = !this.showReplies
      this.$emit('toggle-replies', this.showReplies)
    },

    async onClickDeleteButton(){
      if(this.confirmDelete){
        try{
          await this.deleteComment({commentId: this.item.id})
          this.removeCommentItem(this.item.id)
        }catch (error){
          this.pushMessage({content: error.data.message})
        }
      }
      this.confirmDelete = !this.confirmDelete
    },

    onClickUpdateButton(){
      this.$emit('editing')
    },

    onClickReplyButton(){
      this.$emit('replying')
    }
  }
})
</script>

<style scoped>
@import "./styles/comment-list-item-actions.css";
</style>