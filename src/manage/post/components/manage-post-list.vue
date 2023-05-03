<template>
  <div class="manage-post-list" ref="managePostList">
    <ManagePostListItem v-for="post in posts" :key="post.id" :item="post" />
    <template v-if="loading">
      <ManagePostListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions, mapMutations} from 'vuex';
import ManagePostListItem from '@/manage/post/components/manage-post-list-item.vue';
import ManagePostListItemSkeleton from '@/manage/post/components/manage-post-list-item-skeleton.vue';

export default defineComponent({
  name: 'ManagePostList',

  data(){
    return {
      prevScrollTop: 0
    }
  },

  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      loading: 'post/index/loading',
      posts: 'post/index/posts',
      hasMore: 'post/index/hasMore'
    }),

    filter(){
      return {
        user: this.currentUser ? this.currentUser.id : null,
        action: 'published'
      }
    }
  },

  created() {
    if(this.currentUser){
      this.getPosts({filter: this.filter});
    }

    if(window){
      window.addEventListener('scroll', this.onScrollWindow)
      window.scrollTo({top: 0})
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('scroll', this.onScrollWindow)
    }
  },

  updated() {
    if(document){
      const {clientHeight: documentHeight} = document.documentElement
      const { clientHeight: componentHeight} = this.$refs.managePostList

      if(componentHeight < documentHeight && this.hasMore && !this.loading){
        this.getPosts({filter: this.filter})
      }
    }
  },

  watch: {
    filter(){
      this.getPosts({filter: this.filter});
    }
  },

  methods: {
    ...mapMutations({}),

    ...mapActions({
      getPosts: 'post/index/getPosts'
    }),

    onScrollWindow(){
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement
      const height = clientHeight + scrollTop +200
      const touchDown = scrollHeight - height < 0
      const scrollDown = scrollTop > this.prevScrollTop

      if(touchDown && scrollDown && !this.loading && this.hasMore){
        this.getPost({filter: this.filter})
      }

      this.prevScrollTop = scrollTop
    }
  },

  components: { ManagePostListItemSkeleton, ManagePostListItem },
})
</script>

<style scoped>
@import "./styles/manage-post-list.css";
</style>