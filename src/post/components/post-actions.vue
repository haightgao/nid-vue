<template>
  <div class="post-actions">
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: 'PostActions',

  props: {
    size: {
      type: String
    }
  },

  computed: {
    ...mapGetters({
        postId: 'post/create/postId',
        title: 'post/create/title',
      unsaved: 'post/create/unsaved'
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
    },

    submitButtonClasses(){
      return ['button',this.size, {outline: this.unsaved}]
    }
  },

  emits: ['update', 'create'],

  methods: {
    onClickSubmitButton() {
      if (!this.title.trim()) return;
      if (this.postId) {
        this.$emit('update');
      } else {
        this.$emit('create');
      }
    },
  }
})
</script>

<style scoped>
@import "./styles/post-actions.css";
</style>