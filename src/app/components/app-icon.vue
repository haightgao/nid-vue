<template>
  <i :class="appIconClasses" :style="appIconStyles">{{ name }}</i>
</template>

<script lang="ts">
import { CSSProperties, defineComponent } from 'vue';

export default defineComponent({
  name: 'AppIcon',

  /**
   * 属性
   */
  props: {
    name: { type: String, default: 'favorite' },
    color: { type: String, default: '#000000' },
    size: { type: [String, Number], default: 24 },
  },

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    appIconClasses(): Array<string> {
      return ['app-icon'];
    },
    appIconStyles(): CSSProperties {
      return {
        fontSize: this.size + 'px',
        color: this.color,
      };
    },
  },

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
  components: {},
});
</script>

<style scoped>
@import './styles/app-icon.css';
</style>
