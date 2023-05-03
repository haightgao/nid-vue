<template>
  <div class="manage">
    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Manage'
})
</script>

<style scoped>
@import "./styles/manage.css";
</style>