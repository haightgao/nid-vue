<template>
  <div class="manage-selected-status">
    <div class="content">已选择 {{selectedItems.length}} 个项目</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: 'ManageSelectedStatus',

  computed: {
    ...mapGetters({
      selectedItems: 'manage/select/selectItems'
    })
  }
})
</script>

<style scoped>
@import "./styles/manage-selected-status.css";
</style>