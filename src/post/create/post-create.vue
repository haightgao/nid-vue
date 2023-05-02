<template>
  <div class="post-create">
    <TextField placeholder="标题" v-model="title" />
    <TextareaField placeholder="描述" class="bordered" :rows="1" v-model="content" />
    <button class="button large" @click="onClickSubmitButton">
      {{submitButtonText}}
    </button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import TextField from '@/app/components/text-field.vue';
import TextareaField from '@/app/components/textarea-field.vue';

export default defineComponent({
  name: 'PostCreate',

  data(){
    return {
      title:'',
      content: '',
      postId: null,
    }
  },

  computed: {
    submitButtonText(){
      return this.postId ? "更新" :  "发布"
    }
  },

  watch: {
    $route(to,from){
      const {post: postId} = to.query

      if(postId){
        this.getPost(postId)
      }else{
        this.rest()
      }
    }
  },

  created() {
    const {post: postId} = this.$route.query;
console.log('---')
    if(postId){
      this.getPost(postId)
    }
  },

  methods: {
    ...mapActions({
      createPost: 'post/create/createPost',
      pushMessage: 'notification/pushMessage',
      getPostById: 'post/show/getPostById',
      updatePost: 'post/edit/updatePost'
    }),

    onClickSubmitButton(){
      if(!this.title.trim()) return
      if(this.postId){
        this.submitUpdatePost()
      }else{
        this.submitCreatePost()
      }
    },

    async submitCreatePost(){
      try{
        const response = await this.createPost({
          data: {
            title: this.title,
            content: this.content,
          }
        });
        this.postId = response.data.insertId

        await this.$router.push({
          name: 'postCreate',
          query: { post: this.postId }
        })
      }catch(error){
        await this.pushMessage({
          content: error.data.message
        });
      }
    },

    async getPost(postId){
      try{
        const response = await this.getPostById(postId)
        console.log('response:', response)
        const {title, content} = response.data

        this.postId = postId
        this.title = title
        this.content = content
      }catch (error){
        await this.pushMessage({ conent: error.data.message })
      }
    },

    rest(){
      this.title = ''
      this.content = ''
      this.postId = null
    },

    async submitUpdatePost(){
      try{
        await this.updatePost({
          postId: this.postId,
          data: {
            title: this.title,
            content: this.content,
          }
        })
      }catch (error){
        this.pushMessage({content: error.data.message})
      }
    }
  },

  components: { TextareaField, TextField },
})
</script>

<style scoped>
@import "./styles/post-create.css";
</style>