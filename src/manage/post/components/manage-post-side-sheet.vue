<template>
  <div class="manage-post-side-sheet">
    <ManagePostEdit />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ManagePostEdit from '@/manage/post/edit/manage-post-edit.vue';

export default defineComponent({
  name: 'ManagePostSideSheet',
  components: { ManagePostEdit },
})
</script>

<style scoped>
@import "./styles/manage-post-side-sheet.css";
</style>