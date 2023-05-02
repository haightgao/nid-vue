<template>
  <div class="app-sidebar-item add">
    <router-link :to="{name: 'postCreate'}" class="link">
      <AppIcon name="add_a_photo" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppSidebarItemAdd',

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
  components: { AppIcon },
});
</script>

<style scoped></style>
