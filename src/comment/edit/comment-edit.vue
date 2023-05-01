<template>
  <div class="comment-edit">
    <TextareaField v-model="commentContent" />
    <div class="actions">
      <button class="button pill" @click="onClickCancelButton">取消</button>
      <button class="button pill" @click="onClickUpdateButton">更新</button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapActions} from 'vuex';
import TextareaField  from '@/app/components/textarea-field.vue';

export default defineComponent({
  name: 'CommentEdit',

  props: {
    comment: {
      type: Object
    }
  },

  data(){
    return {
      commentContent: this.comment.content
    }
  },

  emits: ['updated'],

  methods: {
    ...mapActions({
      updateComment: 'comment/edit/updateComment',
      pushMessage: 'notification/pushMessage'
    }),

    onClickCancelButton(){
      this.commentContent = this.comment.content
    },

    async onClickUpdateButton(){
      if(!this.commentContent.trim()){
        return
      }

      try{
        await this.updateComment({
          commentId: this.comment.id,
          content: this.commentContent
        })

        this.$emit('updated', this.commentContent)
      }catch (error){
        await this.pushMessage({ content: error.data.message })
      }
    },
  },

  components: {TextareaField}
})
</script>

<style scoped>
@import "./styles/comment-edit.css";
</style>