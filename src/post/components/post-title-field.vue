<template>
  <div class="post-title-field">
    <TextField placeholder="标题" v-model="postTitle" @dirty="onDirtyText" />
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapMutations} from 'vuex';
import TextField from '@/app/components/text-field.vue';

export default defineComponent({
  name: 'PostTitleField',

  computed: {
    ...mapGetters({
      title: 'post/create/title',
      unsaved: 'post/create/unsaved',
    }),

    postTitle: {
      get(){
        return this.title
      },
      set(value){
        this.setTitle(value)
      }
    }
  },

  methods: {
    ...mapMutations({
      setTitle: 'post/create/setTitle',
      setUnsaved: 'post/create/setUnsaved'
    }),

    onDirtyText(){
      if(!this.unsaved){
        this.setUnsaved(true)
      }
    }
  },

  components: { TextField },
})
</script>

<style scoped>
@import "./styles/post-title-field.css";
</style>