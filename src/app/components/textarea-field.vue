<template>
  <div class="textarea-field field">
    <textarea class="input textarea"
              :value="modelValue"
              :placeholder="placeholder"
              :rows="rows"
              @input="$emit('update:modelValue', $event.target.value.trim())"
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

  emits: ['update:modelValue'],
});
</script>