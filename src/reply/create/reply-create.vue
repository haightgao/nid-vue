<template>
  <div class="reply-create">
    <div class="thumbnail">
      <UserAvatar :user="currentUser" />
    </div>
    <div class="content">
      <TextareaField placeholder="回复评论" v-model="content" @keydown="onKeyDownReplyTextarea" />
      <div class="actions">
        <button class="button pill" @click="onClickCancelButton">取消</button>
        <button class="button pill" @click="onClickReplyButton">回复</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions,mapMutations } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import TextareaField from '@/app/components/textarea-field.vue';

export default defineComponent({
  name: 'ReplyCreate',

  props: {
    comment: {
      type: Object
    },
    showReplies: {
      type: Boolean
    }
  },

  data() {
    return {
      content: '',
    };
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
  },

  emits: ['replied'],

  methods: {
    ...mapMutations({
      increaseTotalReplies: 'comment/index/increaseTotalReplies'
    }),

    ...mapActions({
      createReply: 'reply/create/createReply',
      pushMessage: 'notification/pushMessage',
      getReplies: 'reply/index/getReplies'
    }),

    async submitReply(){
      if(!this.content.trim()) return

      try {
        await this.createReply({
          commentId: this.comment.id,
          postId: this.comment.post.id,
          content: this.content,
        })
        this.content = ''
        this.$emit('replied', this.comment.id)

        this.increaseTotalReplies(this.comment.id)

        if(this.showReplies){
          await this.getReplies(this.comment.id)
        }
      }catch (e){
        await this.pushMessage({ content: e.data.message })
      }
    },

    onClickCancelButton() {
      this.content = ''
    },
    onClickReplyButton() {
      this.submitReply()
    },
    onKeyDownReplyTextarea(event) {
      if((event.ctrlKey && event.key === 'Enter') || (event.metaKey && event.key === 'Enter')){
        this.submitReply()
      }
    },
  },

  components: { TextareaField, UserAvatar },
});
</script>

<style scoped>
@import "./styles/reply-create.css";
</style>