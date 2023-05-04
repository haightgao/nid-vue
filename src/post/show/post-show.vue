<template>
  <PostShowSkeleton :class="postShowClasses" v-if="!showPost" />
  <div :class="postShowClasses" v-if="showPost">
    <PostShowMedia :post="post" @click="onClickPostShowMedia" />
    <div class="section meta actions">
      <PostShowFileMeta :post="post" />
      <PostShowActions :post="post" />
    </div>
    <PostShowHeader :post="post" @click="onClickPostHeader"/>
    <PostShowContent :post="post" />
    <PostShowTags v-if="post.tags" :tags="post.tags" />
    <PostShowEdit :post="post" v-if="showPostEdit" />
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
import PostShowEdit from '@/post/show/components/post-show-edit.vue';

export default defineComponent({
  title() {
    if (this.showPost) {
      return this.post.title;
    }
  },

  props: {
    postId: String,
  },

  data(){
    return {
      showPostEdit: false
    }
  },

  created() {
    this.getPostById(this.postId);

    // 布局
    const layout = getStorage('post-show-layout');
    if(layout){
      this.setLayout(layout);
    }

    if(window){
      window.addEventListener('keyup', this.onKeyUpWindow)
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('keyup', this.onKeyUpWindow)
    }
  },

  computed: {
    ...mapGetters({
      loading: 'post/show/loading',
      post: 'post/show/post',
      layout: 'post/show/layout',
      sideSheetComponent: 'layout/sideSheetComponent',
      posts: 'post/index/posts',
      isSideSheetActive: 'layout/isSideSheetActive'
    }),

    showPost() {
      return !this.loading && this.post;
    },

    postShowClasses(){
      return ['post-show', this.layout, {aside: this.isSideSheetActive}]
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
    },
    onKeyUpWindow(event){
      if(event.ctrlKey || event.metaKey) return

      switch (event.key){
        case 'b':
          if(this.posts.length){
            this.$router.back()
          }
          break
        default:
          break
      }
    },

    onClickPostHeader(){
      this.showPostEdit = !this.showPostEdit
    }
  },

  components: { PostShowEdit, PostShowSkeleton, PostShowContent, PostShowMedia,PostShowHeader,PostShowActions,PostShowFileMeta,PostShowTags}
});
</script>

<style scoped>
@import "./styles/post-show.css";
</style>
