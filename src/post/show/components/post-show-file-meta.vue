<template>
  <div class="post-show-file-meta">
    <PostShowFileMetaKit :kit="kit" />
    <PostShowFileMetaSpecs :specs="specs" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import PostShowFileMetaKit from '@/post/show/components/post-show-file-meta-kit.vue';
import PostShowFileMetaSpecs from '@/post/show/components/post-show-file-meta-specs.vue';

export default defineComponent({
  name: 'PostShowFileMeta',

  props: {
    post: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      loading: 'file/show/loading',
      kit: 'file/show/kit',
      specs: 'file/show/specs'
    })
  },

  created() {
    this.getFileById(this.post.file.id);
  },

  methods: {
    ...mapActions({
      getFileById: 'file/show/getFileById'
    })
  },

  components: {PostShowFileMetaKit,PostShowFileMetaSpecs}
})
</script>

<style scoped>
@import "./styles/post-show-file-meta.css";
</style>