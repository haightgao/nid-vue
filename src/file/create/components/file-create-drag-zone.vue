<template>
  <div
    :class="fileCreateDragZoneClasses"
    @dragover.prevent
    @drop.prevent="onDropDragZone"
    @dragenter="onDragEnterDragZone"
    @dragleave="onDragLeaveDragZone"
  >
    <FileField
      name="file"
      @change="onChangeFile"
      fileType="image/jpg,image/jpeg"
      :text="fileFieldText"
    />
    <div class="description">直接把图像文件拖放到这里</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import FileField from '@/app/components/file-field.vue';

export default defineComponent({
  name: 'FileCreateDragZone',

  data() {
    return {
      isOverlay: false,
    };
  },

  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
    }),

    fileFieldText() {
      return '选择文件';
    },

    fileCreateDragZoneClasses() {
      return [
        'file-create-drag-zone',
        {
          overlay: this.isOverlay,
        },
        {
          active: this.previewImage,
        },
      ];
    },
  },

  emits: ['change'],

  methods: {
    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    onChangeFile(files) {
      this.$emit('change', files);
    },
    onDropDragZone(event) {
      const allowedFileTypes = ['image/jpg', 'image/jpeg'];
      const selectedFile = event.dataTransfer.files[0];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        this.pushMessage({
          content: '只能上传 JPG 图像文件',
        });
        return;
      }

      this.isOverlay = false;
      this.$emit('change', event.dataTransfer.files);
    },
    onDragEnterDragZone() {
      this.isOverlay = true;
    },
    onDragLeaveDragZone() {
      this.isOverlay = false;
    },
  },

  components: { FileField },
});
</script>

<style scoped>
@import './styles/file-create-drag-zone.css';</style
>c
