<template>
  <transition name="page-side-sheet">
    <div class="page-side-sheet" v-if="sideSheetComponent">
      <CloseButton @click="onClickCloseButton" />
      <component :is="sideSheetComponent" />
    </div>
  </transition>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters,mapMutations} from 'vuex';
import CommentSideSheet from '@/comment/components/comment-side-sheet.vue';
import CloseButton from '@/app/components/close-button.vue';

export default defineComponent({
  name: 'PageSideSheet',

  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent'
    })
  },

  created() {
    if(window){
      window.addEventListener('keyup', this.onKeyUpWindow)
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('keyup', this.onKeyUpWindow)
    }
  },

  methods: {
    ...mapMutations({
      resetSideSheet: 'layout/resetSideSheet'
    }),
    onClickCloseButton(){
      this.resetSideSheet()
    },
    onKeyUpWindow(event){
      if(event.key === 'Escape'){
        this.resetSideSheet()
      }
    }
  },

  components: { CloseButton, CommentSideSheet}
})
</script>

<style scoped>
@import "./styles/page-side-sheet.css";
</style>