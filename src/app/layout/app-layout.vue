<template>
  <div class="page">
    <PageHeader />
    <PageAside />
    <div class="page-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import PageHeader from './page-header';
import PageAside from './page-aside';

export default defineComponent({
  name: 'AppLayout',

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
  components: { PageHeader, PageAside },
});
</script>

<style scoped></style>
