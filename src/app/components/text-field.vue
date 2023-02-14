<template>
  <div class="field">
    <input
      class="input text"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInputHanlde"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextField',

  /**
   * 属性
   */
  props: {
    modelValue: {
      type: String,
    },

    type: {
      type: String,
      default: 'text',
    },

    placeholder: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

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
  methods: {
    onInputHanlde(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped></style>
