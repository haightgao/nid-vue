<template>
  <div class="manage-post-list-item-media">
    <img class="image" :src="item.file.size.medium" alt="" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ManagePostListItemMedia',

  props: {
    item: {
      type: Object
    }
  }
})
</script>

<style scoped>
@import "./styles/manage-post-list-item-media.css";
</style>