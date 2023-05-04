<template>
  <button :class="submitButtonClasses" @click="onClickSubmitButton">
    {{submitButtonText}}
  </button>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'SubmitButton',

  props: {
    text: {
      type: String,
      default: '提交'
    },

    unsaved: {
      type: Boolean
    }
  },

  computed: {
    submitButtonClasses(){
      return ['button', {outline: this.unsaved}]
    },

    submitButtonText(){
      return this.text
    }
  },

  emits: ['submit'],

  methods: {
    onClickSubmitButton(){
      this.$emit('submit')
    }
  }
})
</script>

<style scoped>
</style>