<template>
  <div class="app-sidebar">
    <AppSidebarItemBrand />
    <AppSidebarItemPopular />
    <AppSidebarItemAdd />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppSidebarItemBrand from './components/app-sidebar-item-brand';
import AppSidebarItemPopular from './components/app-sidebar-item-popular';
import AppSidebarItemAdd from './components/app-sidebar-item-add';

export default defineComponent({
  name: 'AppSidebar',

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
  components: { AppSidebarItemBrand, AppSidebarItemPopular, AppSidebarItemAdd },
});
</script>

<style scoped>
@import './styles/app-sidebar.css';
</style>
