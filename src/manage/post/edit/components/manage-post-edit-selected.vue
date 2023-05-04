<template>
  <div class="manage-post-edit-selected">
    <ManageSelectedStatus />
    <ManagePostEditSelectedList />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ManagePostEditSelectedList from '@/manage/post/edit/components/manage-post-edit-selected-list.vue';
import ManageSelectedStatus from '@/manage/components/manage-selected-status.vue';

export default defineComponent({
  name: 'ManagePostEditSelected',
  components: { ManageSelectedStatus, ManagePostEditSelectedList },
})
</script>

<style scoped>
@import "./styles/manage-post-edit-selected.css";
</style>