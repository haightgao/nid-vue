<template>
  <div class="post-create">
    <FileCreate @change="onChangeFileCreate" />
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostActions
      @update="submitUpdatePost"
      @create="submitCreatePost"
      @delete="onDeletePost"
      size="large"
      :useDeleteButton="postId"
    />
    <PostMeta :post="postCache" v-if="postCache" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostTagField from '@/post/components/post-tag-field.vue';
import PostTitleField from '@/post/components/post-title-field.vue';
import PostContentField from '@/post/components/post-content-field.vue';
import PostActions from '@/post/components/post-actions.vue';
import PostMeta from '@/post/components/post-meta.vue';
import FileCreate from '@/file/create/file-create.vue';

export default defineComponent({
  name: 'PostCreate',

  data() {
    return {
      postCache: null,
    };
  },

  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
      content: 'post/create/content',
      post: 'post/show/post',
      selectedFile: 'file/create/selectedFile',
      isLoggedIn: 'auth/isLoggedIn',
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
    post(newValue) {
      if (newValue) {
        this.postCache = newValue;
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
      deletePost: 'post/destroy/deletePost',
      createFile: 'file/create/createFile',
    }),

    ...mapMutations({
      setTags: 'post/edit/setTags',
      setPostId: 'post/create/setPostId',
      setTitle: 'post/create/setTitle',
      setContent: 'post/create/setContent',
      setUnsaved: 'post/create/setUnsaved',
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
    }),

    async submitCreatePost() {
      if (!this.isLoggedIn) {
        await this.pushMessage({
          content: '请先登录',
        });
        return;
      }
      try {
        await this.createPost({
          data: {
            title: this.title,
            content: this.content,
          },
          file: this.selectedFile,
        });

        await this.$router.push({
          name: 'postCreate',
          query: { post: this.postId },
        });
        this.setUnsaved(false);
        await this.getPost(this.postId);
      } catch (error) {
        await this.pushMessage({
          content: error.data.message,
        });
      }
    },

    async getPost(postId) {
      try {
        await this.getPostById(postId);
        const { title, content, tags, file } = this.post;

        this.setPostId(postId);
        this.setTitle(title);
        this.setContent(content);
        this.setTags(tags);

        if (file) {
          this.setPreviewImage(file.size.large);
        }
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    rest() {
      this.setPostId(null);
      this.setTitle('');
      this.setContent('');
      this.setTags(null);
      this.setUnsaved(false);
      this.setSelectedFile(null);
      this.setPreviewImage(null);
      this.postCache = null;
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
        this.setUnsaved(false);
        await this.getPost(this.postId);
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePost() {
      try {
        await this.deletePost({ postId: this.postId });

        this.$router.push({
          name: 'postCreate',
        });
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    onChangeFileCreate(files) {
      const file = files[0];
      if (!file) return;

      if (!this.title) {
        this.setTitle(file.name.split('.')[0]);
      }

      if (this.postId) {
        this.submitCreateFile();
      } else {
        this.submitCreatePost();
      }
    },

    async submitCreateFile() {
      if (!this.isLoggedIn) {
        await this.pushMessage({
          content: '请先登录',
        });
        return;
      }
      try {
        await this.createFile({ postId: this.postId, file: this.selectedFile });
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },
  },

  components: {
    FileCreate,
    PostMeta,
    PostActions,
    PostContentField,
    PostTitleField,
    PostTagField,
  },
});
</script>

<style scoped>
@import './styles/post-create.css';
</style>
