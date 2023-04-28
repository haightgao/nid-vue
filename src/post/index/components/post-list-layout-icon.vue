<template>
  <i :class="postListLayoutIconClasses" @click="$emit('click', name)"></i>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PostListLayoutIcon',

  props: {
    name: {
      type: String,
    },
  },

  computed: {
    ...mapGetters({
      theme: 'layout/theme',
      layout: 'post/index/layout',
    }),
    postListLayoutIconClasses() {
      return [
        'post-list-layout-icon',
        this.name,
        this.theme,
        { active: this.isActive(this.name) },
      ];
    },
  },

  methods: {
    isActive(name) {
      return this.layout === name;
    },
  },

  emits: ['click'],
});
</script>

<style scoped>
@import './styles/post-list-layout-icon.css';
</style>
