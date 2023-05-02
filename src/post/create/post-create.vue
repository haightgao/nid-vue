<template>
  <div class="post-create">
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostActions @update="submitUpdatePost" @create="submitCreatePost" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostTagField from '@/post/components/post-tag-field.vue';
import PostTitleField from '@/post/components/post-title-field.vue';
import PostContentField from '@/post/components/post-content-field.vue';
import PostActions from '@/post/components/post-actions.vue';

export default defineComponent({
  name: 'PostCreate',

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
      content: 'post/create/content',
      post: 'post/show/post',
    }),
  },

  watch: {
    $route(to) {
      const { post: postId } = to.query;

      if (postId) {
        this.getPost(parseInt(postId, 10));
      } else {
        this.rest();
      }
    },
  },

  created() {
    const { post: postId } = this.$route.query;
    if (postId) {
      this.getPost(parseInt(postId, 10));
    }
  },

  methods: {
    ...mapActions({
      createPost: 'post/create/createPost',
      pushMessage: 'notification/pushMessage',
      getPostById: 'post/show/getPostById',
      updatePost: 'post/edit/updatePost',
    }),

    ...mapMutations({
      setTags: 'post/edit/setTags',
      setPostId: 'post/create/setPostId',
      setTitle: 'post/create/setTitle',
      setContent: 'post/create/setContent',
      setUnsaved: 'post/create/setUnsaved',
    }),



    async submitCreatePost() {
      try {
        await this.createPost({
          data: {
            title: this.title,
            content: this.content,
          },
        });

        await this.$router.push({
          name: 'postCreate',
          query: { post: this.postId },
        });
        this.setUnsaved(false)
      } catch (error) {
        await this.pushMessage({
          content: error.data.message,
        });
      }
    },

    async getPost(postId) {
      try {
        await this.getPostById(postId);
        const { title, content, tags } = this.post;

        this.setPostId(postId);
        this.setTitle(title);
        this.setContent(content);
        this.setTags(tags);
      } catch (error) {
        await this.pushMessage({ conent: error.data.message });
      }
    },

    rest() {
      this.setPostId(null);
      this.setTitle('');
      this.setContent('');
      this.setTags([]);
      this.setUnsaved(false)
    },

    async submitUpdatePost() {
      try {
        await this.updatePost({
          postId: this.postId,
          data: {
            title: this.title,
            content: this.content,
          },
        });
        this.setUnsaved(false)
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  components: { PostActions, PostContentField, PostTitleField, PostTagField },
});
</script>

<style scoped>
@import "./styles/post-create.css";
</style>