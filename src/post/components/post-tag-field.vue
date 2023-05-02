<template>
  <div class="post-tag-field">
    <div class="content">
      <TextField placeholder="标签" v-model="name" @keyup.enter="onKeyUpEnterTag" />
      <button class="button basic" @click="onClickAddButton">
        <AppIcon name="add" />
      </button>
    </div>
    <div class="meta" v-if="tags">
      <transition-group name="post-tag">
        <PostTag v-for="tag in tags" :key="tag.id" :tag="tag" useDeleteButton @delete="onDeletePostTag" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapActions,mapGetters} from 'vuex';
import TextField from '@/app/components/text-field.vue';
import AppIcon from '@/app/components/app-icon.vue';
import PostTag from '@/post/components/post-tag.vue';

export default defineComponent({
  name: 'PostTagField',

  props: {
    postId: {
      type: String
    }
  },

  data(){
    return {
      name: '',
    }
  },

  computed: {
    ...mapGetters({
      tags: 'post/edit/tags'
    })
  },

  methods: {
    ...mapActions({
      createPostTag: 'post/edit/createPostTag',
      deletePostTag: 'post/edit/deletePostTag',
      pushMessge: 'notification/pushMessage'
    }),

    onKeyUpEnterTag(){
      this.submitCreatePostTag()
    },

    onClickAddButton(){
      this.submitCreatePostTag()
    },

    async submitCreatePostTag(){
      if(!this.postId || !this.name) return

      try{
        await this.createPostTag({
          postId: this.postId,
          data: {
            name: this.name
          }
        })

        this.name = ''
      }catch (error){
        await this.pushMessge({ content: error.data.message })
      }
    },

    async onDeletePostTag(tagId){
      try{
        await this.deletePostTag({
          postId: this.postId,
          tagId
        })
      }catch (error){
        await this.pushMessge({ content: error.data.message })
      }
    }
  },

  components: { PostTag, AppIcon, TextField },
})
</script>

<style scoped>
@import "./styles/post-tag-field.css";
</style>