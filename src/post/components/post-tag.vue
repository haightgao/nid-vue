<template>
  <div class="post-tag">
    <div class="text">
      <router-link class="link" :to="tagNameLinkTo">{{tag.name}}</router-link>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'PostTag',

  props: {
    tag: {
      type: Object
    }
  },

  computed:{
    tagNameLinkTo(){
      return {
        name: 'postIndexPopular',
        query: {tag: this.tag.name}
      }
    }
  }
})
</script>

<style scoped>
@import "./styles/post-tag.css";
</style>