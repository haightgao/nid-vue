<template>
  <div :class="managePostListItemClasses">
    <ManagePostListItemMedia :item="item" />
    <ManagePostListItemContent :item="item"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import ManagePostListItemMedia from '@/manage/post/components/manage-post-list-item-media.vue';
import ManagePostListItemContent from '@/manage/post/components/manage-post-list-item-content.vue';

export default defineComponent({
  name: 'ManagePostListItem',
  components: { ManagePostListItemContent, ManagePostListItemMedia },

  props: {
    item: {
      type:Object
    }
  },

  computed: {
    managePostListItemClasses(){
      return ['manage-post-list-item', {selected: false}];
    }
  }
})
</script>

<style scoped>
@import "./styles/manage-post-list-item.css";
</style>