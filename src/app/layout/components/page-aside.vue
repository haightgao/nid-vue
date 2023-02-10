<template>
  <div class="page-aside">
    <AppSidebar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppSidebar from '@/app/sidebar/app-sidebar.vue';

export default defineComponent({
  name: 'PageAside',

  components: { AppSidebar },
});
</script>

<style scoped></style>
