<template>
  <div class="manage-post">
    <ManagePostList />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapMutations} from 'vuex';
import ManagePostList from '@/manage/post/components/manage-post-list.vue';

export default defineComponent({
  name: 'ManagePost',

  title(){
    return '内容管理'
  },

  created() {
    this.setSideSheetComponent('ManagePostSideSheet')
  },

  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent'
    })
  },

  components: { ManagePostList },
})
</script>

<style scoped>
@import "./styles/manage-post.css";
</style>