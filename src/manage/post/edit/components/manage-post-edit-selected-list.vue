<template>
  <div class="manage-post-edit-selected-list">
    <ManagePostEditSelectedListItem v-for="post in selectedPosts" :key="post.id" :item="post" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';
import ManagePostEditSelectedListItem from '@/manage/post/edit/components/manage-post-edit-selected-list-item.vue';

export default defineComponent({
  name: 'ManagePostEditSelectedList',

  computed: {
    ...mapGetters({
      selectedPosts: 'manage/select/selectedPosts'
    })
  },

  components: { ManagePostEditSelectedListItem },
})
</script>

<style scoped>
@import "./styles/manage-post-edit-selected-list.css";
</style>