<template>
  <div :class="fileCreateClasses">
    <FileCreateMedia v-if="previewImage" />
    <FileCreateDragZone @change="onChangeDragZone" v-if="!uploading" />
    <FileCreateStatus v-if="uploading"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import FileCreateDragZone from '@/file/create/components/file-create-drag-zone.vue';
import FileCreateMedia from '@/file/create/components/file-create-media.vue';
import FileCreateStatus from '@/file/create/components/file-create-status.vue';

export default defineComponent({
  name: 'FileCreate',

  emits: ['change'],

  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
      uploading: 'file/create/uploading'
    }),

    fileCreateClasses() {
      return ['file-create', { active: this.previewImage }];
    },
  },

  methods: {
    ...mapMutations({
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
    }),

    onChangeDragZone(files) {
      const file = files[0]

      if(file){
        this.setSelectedFile(file)
        this.createImagePreview(file)
      }
      this.$emit('change', files);
    },

    createImagePreview(file){
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = event => {
        this.setPreviewImage(event.target.result)
      }
    }
  },

  components: { FileCreateStatus, FileCreateMedia, FileCreateDragZone },
});
</script>

<style scoped>
@import "./styles/file-create.css";
</style>