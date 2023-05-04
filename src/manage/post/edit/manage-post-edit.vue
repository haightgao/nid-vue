<template>
  <div class="manage-post-edit">
    <PageSideSheetStatus v-if="!hasSelected" content="请选择要编辑的项目" />
    <ManagePostEditSelected v-if="hasSelected" />
    <ManagePostEditForm v-if="hasSelected" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';
import ManagePostEditSelected from '@/manage/post/edit/components/manage-post-edit-selected.vue';
import PageSideSheetStatus from '@/app/layout/components/page-side-sheet-status.vue';
import ManagePostEditForm from '@/manage/post/edit/components/manage-post-edit-form.vue';

export default defineComponent({
  name: 'ManagePostEdit',

  computed: {
    ...mapGetters({
      hasSelected: 'manage/select/hasSelected'
    })
  },

  components: { ManagePostEditForm, PageSideSheetStatus, ManagePostEditSelected },
})
</script>

<style scoped>
@import "./styles/manage-post-edit.css";
</style>