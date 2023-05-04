<template>
  <button :class="deleteButtonClasses" @click="onClickDeleteButton">
    {{ deleteButtonText }}
  </button>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DeleteButton',

  data(){
    return {
      confirmDelete: false,
      timeoutId: null,
    }
  },

  computed: {
    deleteButtonClasses(){
      return ['button', 'red', {outline: !this.confirmDelete}]
    },
    deleteButtonText() {
      return this.confirmDelete ? '确定删除': '删除'
    }
  },

  emits: ['delete'],

  methods: {
    onClickDeleteButton(){
      if(this.timeoutId){
        clearInterval(this.timeoutId)
      }

      if(this.confirmDelete){
        this.$emit('delete')
      }

      this.confirmDelete = !this.confirmDelete

      if(this.confirmDelete){
        this.timeoutId = setTimeout(() => {
          this.confirmDelete = false
        }, 3000)
      }
    }
  }
})
</script>

<style scoped>
</style>