<template>
  <div
    :class="fileCreateDragZoneClasses"
    @dragover.prevent
    @drop.prevent="onDropDragZone"
    @dragenter="onDragEnterDragZone"
    @dragleave="onDragLeaveDragZone"
  >
    <FileField name="file" @change="onChangeFile" fileType="image/*" :text="fileFieldText" />
    <div class="description">直接把图像文件拖放到这里</div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters} from 'vuex';
import FileField from '@/app/components/file-field.vue';

export default defineComponent({
  name: 'FileCreateDragZone',

  data(){
    return {
      isOverlay: false
    }
  },

  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage'
    }),

    fileFieldText(){
      return '选择文件'
    },

    fileCreateDragZoneClasses(){
      return ['file-create-drag-zone', {
        overlay: this.isOverlay
      },{
        active: this.previewImage
      }]
    }
  },

  emits: ['change'],

  methods: {
    onChangeFile(files){
      this.$emit('change', files)
    },
    onDropDragZone(event){
      this.isOverlay = false
      this.$emit('change', event.dataTransfer.files)
    },
    onDragEnterDragZone(){
      this.isOverlay = true
    },
    onDragLeaveDragZone(){
      this.isOverlay = false
    }
  },

  components: { FileField },
})
</script>

<style scoped>
@import "./styles/file-create-drag-zone.css";
</style>c