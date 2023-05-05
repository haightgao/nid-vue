<template>
  <div :class="fileCreateClasses">
    <FileCreateMedia v-if="previewImage" />
    <FileCreateDragZone @change="onChangeDragZone" v-if="!uploading" />
    <FileCreateStatus v-if="uploading" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import FileCreateDragZone from '@/file/create/components/file-create-drag-zone.vue';
import FileCreateMedia from '@/file/create/components/file-create-media.vue';
import FileCreateStatus from '@/file/create/components/file-create-status.vue';

export default defineComponent({
  name: 'FileCreate',

  emits: ['change'],

  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
      uploading: 'file/create/uploading',
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

    ...mapActions({
      pushMessage: 'notification/pushMessage',
    }),

    async onChangeDragZone(files) {
      const file = files[0];

      if (!file) return;

      try {
        const result = await this.createImagePreview(file);
        this.setSelectedFile(file);
        this.setPreviewImage(result);
        this.$emit('change', files);
      } catch (error) {
        this.pushMessage({ content: error });
      }
    },

    createImagePreview(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = event => {
          const image = new Image();
          image.src = event.target.result;

          image.onload = () => {
            if (image.width > 1280) {
              resolve(event.target.result);
            } else {
              reject('图像宽度小于 1280像素');
            }
          };
        };
      });
    },
  },

  components: { FileCreateStatus, FileCreateMedia, FileCreateDragZone },
});
</script>

<style scoped>
@import './styles/file-create.css';
</style>
