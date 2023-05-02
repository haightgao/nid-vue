<template>
  <div class="textarea-field field">
    <textarea class="input textarea"
              :value="modelValue"
              :placeholder="placeholder"
              :rows="rows"
              @input="onInputTextarea"
    ></textarea>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextareaField',

  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    rows: {
      type: Number,
      default: 2,
    },
  },

  data(){
    return {
      value: ''
    }
  },

  emits: ['update:modelValue','dirty'],

  methods: {
    onInputTextarea(event){
      const value = event.target.value.trim()

      if(this.value !== value){
        this.$emit('dirty')
      }

      this.value = value
      this.$emit('update:modelValue', event.target.value.trim())
    }
  }
});
</script>