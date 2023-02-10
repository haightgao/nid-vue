<template>
  <i :class="appIconClasses" :style="appIconStyles">{{ name }}</i>
</template>

<script lang="ts">
import { CSSProperties, defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'AppIcon',

  /**
   * 属性
   */
  props: {
    name: { type: String, default: 'favorite' },
    color: { type: String },
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
    ...mapGetters({
      theme: 'layout/theme',
    }),

    appIconClasses(): Array<string> {
      return ['app-icon'];
    },
    appIconStyles(): CSSProperties {
      let color;

      if (this.color) {
        color = this.color;
      } else {
        color = this.theme === 'dark' ? '#585858' : '#000000';
      }

      return {
        fontSize: this.size + 'px',
        color,
        width: this.size + 'px',
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
