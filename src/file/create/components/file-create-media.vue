<template>
  <div :class="fileCreateMediaClasses">
    <img class="image" :src="previewImage" @load="onLoadImage"  alt=""/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';

export default defineComponent({
  name: 'FileCreateMedia',

  data(){
    return {
      loaded: false
    }
  },

  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage'
    }),

    fileCreateMediaClasses(){
      return ['file-create-media', {loading: !this.loaded}]
    },
  },

  methods: {
    onLoadImage() {
      this.loaded = true
    }
  }
})
</script>

<style scoped>
@import "./styles/file-create-media.css";
</style>