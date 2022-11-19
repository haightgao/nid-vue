<template>
  <div class="page-header">
    <div class="container">
      <AppToolbar />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppToolbar from '@/app/toolbar/app-toolbar';

export default defineComponent({
  name: 'PageHeader',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {},

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: { AppToolbar },
});
</script>

<style scoped></style>
