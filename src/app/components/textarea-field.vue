<template>
  <div class="textarea-field field">
    <textarea class="input textarea"
              :value="modelValue"
              :placeholder="placeholder"
              @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextareaField',

  props: {
    modelValue: {
      type: String
    },
    placeholder: {
      type: String
    }
  },

  emits: ['update:modelValue']
});
</script>