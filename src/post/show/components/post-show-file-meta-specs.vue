<template>
  <div class="post-show-file-meta-specs">
    <div class="icon">
      <AppIcon name="camera" />
    </div>
    <div class="content">
      <div class="spec" v-for="(spec, index) in specs" :key="index">
        <div class="title">{{spec.title}}</div>
        <div class="value">{{spec.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostShowFileMetaSpecs',

  props: {
    specs: {
      type: Array
    }
  },

  components: {AppIcon}
})
</script>

<style scoped>
@import "./styles/post-show-file-meta-specs.css";
</style>