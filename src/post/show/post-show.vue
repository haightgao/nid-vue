<template>
  <PostShowSkeleton :class="postShowClasses" v-if="!showPost" />
  <div :class="postShowClasses" v-if="showPost">
    <PostShowMedia :post="post" @click="onClickPostShowMedia" />
    <div class="section meta actions">
      <PostShowFileMeta :post="post" />
      <PostShowActions :post="post" />
    </div>
    <PostShowHeader :post="post" />
    <PostShowContent :post="post" />
    <PostShowTags v-if="post.tags" :tags="post.tags" />
  </div>
</template>

<script>
import { mapGetters, mapActions,mapMutations } from 'vuex';
import { defineComponent } from 'vue';
import { getStorage } from '@/app/app.service';
import PostShowMedia from '@/post/show/components/post-show-media.vue';
import PostShowHeader from '@/post/show/components/post-show-header.vue';
import PostShowContent from '@/post/show/components/post-show-content.vue';
import PostShowActions from '@/post/show/components/post-show-actions.vue';
import PostShowFileMeta from '@/post/show/components/post-show-file-meta.vue';
import PostShowTags from '@/post/show/components/post-show-tags.vue';
import PostShowSkeleton from '@/post/show/components/post-show-skeleton.vue';

export default defineComponent({
  title() {
    if (this.showPost) {
      return this.post.title;
    }
  },

  props: {
    postId: String,
  },

  created() {
    this.getPostById(this.postId);

    // 布局
    const layout = getStorage('post-show-layout');
    if(layout){
      this.setLayout(layout);
    }
  },

  computed: {
    ...mapGetters({
      loading: 'post/show/loading',
      post: 'post/show/post',
      layout: 'post/show/layout'
    }),

    showPost() {
      return !this.loading && this.post;
    },

    postShowClasses(){
      return ['post-show', this.layout]
    }
  },

  methods: {
    ...mapActions({
      getPostById: 'post/show/getPostById',
    }),
    ...mapMutations({
      setLayout: 'post/show/setLayout',
    }),
    onClickPostShowMedia(){
      this.setLayout(`${this.layout ? '': 'flow'}`)
    }
  },

  components: { PostShowSkeleton, PostShowContent, PostShowMedia,PostShowHeader,PostShowActions,PostShowFileMeta,PostShowTags}
});
</script>

<style scoped>
@import "./styles/post-show.css";
</style>
