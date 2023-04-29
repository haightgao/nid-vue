<template>
  <div class="post-show-file-meta-kit">
    <div class="icon">
      <AppIcon name="camera_alt"/>
    </div>
    <div class="content">
      <div class="kit" v-for="(item, index) in kit" :key="index">
        <div class="title">{{item.title}}</div>
        <div class="value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name:'PostShowFileMetaKit',

  props: {
    kit: {
      type: Array
    }
  },

  components: {AppIcon}
})
</script>

<style scoped>
@import "./styles/post-show-file-meta-kit.css";
</style>