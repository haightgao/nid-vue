<template>
  <div class="page-header">
    <div class="container">
      <AppToolbar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppToolbar from '@/app/toolbar/app-toolbar.vue';

export default defineComponent({
  name: 'PageHeader',

  components: { AppToolbar },
});
</script>

<style scoped></style>
