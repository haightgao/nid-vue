<template>
  <div class="post-list-layout-switcher">
    <PostListLayoutIcon
      v-for="(icon, index) in icons"
      :key="index"
      :name="icon"
      @click="onClickPostListLayoutIcon"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import PostListLayoutIcon from './post-list-layout-icon.vue';

export default defineComponent({
  name: 'PostListLayoutSwitcher',

  data() {
    return {
      icons: ['stackable', 'flow', 'stackable-minimal', 'flow-minimal'],
    };
  },

  methods: {
    ...mapMutations({
      setLayout: 'post/index/setLayout',
    }),
    onClickPostListLayoutIcon(icon) {
      this.setLayout(icon);
    },
  },

  components: { PostListLayoutIcon },
});
</script>

<style scoped></style>
