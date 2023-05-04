<template>
  <div class="post-tag-field">
    <div class="content">
      <TextField
        placeholder="标签"
        v-model="name"
        @keyup.enter="onKeyUpEnterTag"
      />
      <button class="button basic" @click="onClickAddButton">
        <AppIcon name="add" />
      </button>
    </div>
    <div class="meta" v-if="hasTags">
      <transition-group name="post-tag">
        <PostTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
          useDeleteButton
          @delete="onDeletePostTag"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import AppIcon from '@/app/components/app-icon.vue';
import PostTag from '@/post/components/post-tag.vue';

export default defineComponent({
  name: 'PostTagField',

  props: {
    postId: {
      type: Number,
    },

    posts: {
      type: Array,
    },
  },

  data() {
    return {
      name: '',
    };
  },

  emits: ['updated'],

  computed: {
    ...mapGetters({
      tags: 'post/edit/tags',
      hasTags: 'post/edit/hasTag',
    }),
  },

  methods: {
    ...mapActions({
      createPostTag: 'post/edit/createPostTag',
      deletePostTag: 'post/edit/deletePostTag',
      pushMessage: 'notification/pushMessage',
    }),

    onKeyUpEnterTag() {
      if (this.posts) {
        this.batchCreatePostTag();
      } else {
        this.submitCreatePostTag();
      }
    },

    onClickAddButton() {
      this.submitCreatePostTag();
    },

    async submitCreatePostTag() {
      if (!this.postId || !this.name) return;

      try {
        await this.createPostTag({
          postId: this.postId,
          data: {
            name: this.name,
          },
        });

        this.name = '';
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePostTag(tagId) {
      if (this.posts) {
        await this.batchDeletePostTag(tagId);
      } else {
        await this.submitDeletePostTag(tagId);
      }
    },

    async batchDeletePostTag(tagId) {
      for (const post of this.posts) {
        if (post.tags && !post.tags.some(tag => tag.id === tagId)) {
          continue;
        }

        try {
          await this.deletePostTag({
            postId: post.id,
            tagId,
          });
        } catch (error) {
          // continue;
        }
      }

      this.$emit('updated');
      this.name = '';
    },

    async submitDeletePostTag(tagId) {
      try {
        await this.deletePostTag({
          postId: this.postId,
          tagId,
        });
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    async batchCreatePostTag() {
      for (const post of this.posts) {
        if (post.tags && post.tags.some(tag => tag.name === this.name.trim())) {
          continue;
        }

        try {
          await this.createPostTag({
            postId: post.id,
            data: {
              name: this.name,
            },
          });
        } catch (error) {
          // continue;
        }
      }

      this.$emit('updated');
      this.name = '';
    },
  },

  components: { PostTag, AppIcon, TextField },
});
</script>

<style scoped>
@import './styles/post-tag-field.css';
</style>
