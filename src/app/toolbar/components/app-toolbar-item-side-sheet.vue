<template>
  <div class="app-toolbar-item side-sheet">
    <button class="button basic" @click="onClickSideSheetButton">
      <AppIcon name="vertical_split"/>
    </button>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapActions} from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'AppToolbarItemSideSheet',

  created() {
    if(window){
      window.addEventListener('keydown', this.onKeyDownWindow)
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('keydown', this.onKeyDownWindow)
    }
  },

  methods: {
    ...mapActions({
      switchSideSheet: 'layout/switchSideSheet'
    }),

    onClickSideSheetButton(){
      this.switchSideSheet()
    },

    onKeyDownWindow(event){
      const isCommandB = event.metaKey && event.key === 'b'
      const isCtrlB = event.ctrlKey && event.key === 'b'
      if(isCommandB || isCtrlB){
        this.switchSideSheet()
      }
    }
  },

  components: { AppIcon },
})
</script>

<style scoped>
</style>