<template>
  <div :class="['page-header',{shadow}]">
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

  props: {},

  data(){
    return {
      shadow: false,
    }
  },

  created() {
    // 监听窗口滚动事件
    if(window){
      window.addEventListener('scroll', this.onScrollWindow)
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('scroll', this.onScrollWindow)
    }
  },

  methods: {
    onScrollWindow(){
      if(document){
        const { scrollTop } = document.documentElement
        this.shadow = scrollTop > 120
      }
    }
  },

  components: { AppToolbar },
});
</script>

<style scoped></style>
