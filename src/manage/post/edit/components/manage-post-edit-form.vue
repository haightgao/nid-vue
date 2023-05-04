<template>
  <div class="manage-post-edit-form">
    <TextField
      v-model="currentEditedPost.title"
      placeholder="标题"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />
    <TextareaField
      class="bordered"
      :rows="1"
      v-model="currentEditedPost.content"
      placeholder="描述"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />

    <PostTagField :posts="selectedPosts" @updated="onUpdatedPostTagField" />

    <div class="actions">
      <DeleteButton @delete="onDeleteButton" />
      <SubmitButton
        text="更新"
        :unsaved="this.unsaved"
        @submit="onSubmitButton"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import TextareaField from '@/app/components/textarea-field.vue';
import SubmitButton from '@/app/components/submit-button.vue';
import DeleteButton from '@/app/components/delete-button.vue';
import PostTagField from '@/post/components/post-tag-field.vue';

export default defineComponent({
  name: 'ManagePostEditForm',

  data() {
    return {
      unsaved: false,
    };
  },

  computed: {
    ...mapGetters({
      isSingleSelect: 'manage/select/isSingleSelect',
      currentEditedPost: 'manage/select/currentEditedPost',
      selectedPosts: 'manage/select/selectedPosts'
    }),
  },

  methods: {
    ...mapMutations({
      setPostItem: 'post/index/setPostItem',
    }),

    ...mapActions({
      updatePost: 'post/edit/updatePost',
      pushMessage: 'notification/pushMessage',
      deleteSelectedPosts: 'manage/select/deleteSelectPosts',
      getSelectedPosts: 'manage/select/getSelectedPosts'
    }),

    onDirty() {
      this.unsaved = true;
    },

    async onSubmitButton() {
      if (!this.unsaved) return;

      try {
        await this.updatePost({
          postId: this.currentEditedPost.id,
          data: this.currentEditedPost,
        });

        this.setPostItem(this.currentEditedPost);

        this.unsaved = false;
      } catch (error) {
        await this.pushMessage({ content: error.data.message });
      }
    },

    onDeleteButton() {
      this.deleteSelectedPosts();
    },

    onUpdatedPostTagField(){
      this.getSelectedPosts()
    }
  },

  components: { PostTagField, DeleteButton, SubmitButton, TextareaField, TextField },
});
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
