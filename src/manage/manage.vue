<template>
  <div class="manage">
    <router-view></router-view>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters,mapActions} from 'vuex';

export default defineComponent({
  name: 'Manage',

  computed: {
    ...mapGetters({
      hasSelected: 'manage/select/hasSelected'
    })
  },

  created() {
    if(window){
      window.addEventListener('keydown', this.onKeyDownWindow)
    }
  },

  unmounted() {
    if(window) {
      window.removeEventListener('keydown', this.onKeyDownWindow)
    }
  },

  methods: {
    ...mapActions({
      manageSelectItems: 'manage/select/manageSelectItems'
    }),

    onKeyDownWindow(event){
      if(this.hasSelected && event.key === 'Escape'){
        this.manageSelectItems({
          resourceType: 'post',
          actionType: 'reset'
        })
      }
    }
  }
})
</script>

<style scoped>
@import "./styles/manage.css";
</style>