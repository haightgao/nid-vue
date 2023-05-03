<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ManagePostList from '@/manage/post/components/manage-post-list.vue';

export default defineComponent({
  name: 'ManagePost',
  components: { ManagePostList },

  title(){
    return '内容管理'
  }
})
</script>

<style scoped>
@import "./styles/manage-post.css";
</style>