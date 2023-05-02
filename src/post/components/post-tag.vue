<template>
  <div class="post-tag">
    <div class="text">
      <router-link class="link" :to="tagNameLinkTo">{{tag.name}}</router-link>
    </div>
    <div class="action" v-if="useDeleteButton">
      <button class="button basic" @click="onClickDeleteButton">
        <AppIcon name="close" size="14" color="#656565" />
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostTag',
  components: { AppIcon },

  props: {
    tag: {
      type: Object
    },
    useDeleteButton: {
      type: Boolean,
      default: false
    }
  },

  computed:{
    tagNameLinkTo(){
      return {
        name: 'postIndexPopular',
        query: {tag: this.tag.name}
      }
    }
  },

  emits: ['delete'],

  methods: {
    onClickDeleteButton(){
      this.$emit('delete', this.tag.id)
    }
  }
})
</script>

<style scoped>
@import "./styles/post-tag.css";
</style>