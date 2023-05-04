<template>
  <div class="page-side-sheet-status">
    <div class="icon">
      <AppIcon name="error_outline" />
    </div>
    <div class="content">
      {{content}}
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PageSideSheetStatus',

  props: {
    content: {
      type: String
    }
  },

  components: { AppIcon },
})
</script>

<style scoped>
@import "./styles/page-side-sheet-status.css";
</style>