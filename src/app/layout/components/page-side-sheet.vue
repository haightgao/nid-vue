<template>
  <transition name="page-side-sheet">
    <div class="page-side-sheet" v-if="isSideSheetActive">
      <CloseButton @click="onClickCloseButton" />
      <component :is="sideSheetComponent" />
    </div>
  </transition>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters,mapMutations,mapActions} from 'vuex';
import CommentSideSheet from '@/comment/components/comment-side-sheet.vue';
import CloseButton from '@/app/components/close-button.vue';

export default defineComponent({
  name: 'PageSideSheet',

  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
      isSideSheetActive: 'layout/isSideSheetActive'
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

    ...mapActions({
      closeSideSheet: 'layout/closeSideSheet'
    }),

    onClickCloseButton(){
      this.closeSideSheet()
    },
    onKeyUpWindow(event){
      if(event.key === 'Escape'){
        this.closeSideSheet()
      }
    }
  },

  components: { CloseButton, CommentSideSheet}
})
</script>

<style scoped>
@import "./styles/page-side-sheet.css";
</style>