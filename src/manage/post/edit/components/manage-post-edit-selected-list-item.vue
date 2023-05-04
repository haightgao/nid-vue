<template>
  <div class="manage-post-edit-selected-list-item">
    <div class="thumbnail">
      <img :src="item.file.size.medium" alt="" class="image">
    </div>
    <div class="actions">
      <button class="button basic circle" @click="onClickRemoveButton(item)">
        <AppIcon name="remove-circle-outline" color="#fff" size="16"/>
      </button>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters, mapActions} from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'ManagePostEditSelectedListItem',
  components: { AppIcon },

  props: {
    item: {
      type: Object
    }
  },

  computed: {
    ...mapGetters({
      selectedItems: 'manage/select/selectItems'
    }),
  },

  methods: {
    ...mapActions({
      manageSelectedItems: 'manage/select/manageSelectItems',
    }),

    onClickRemoveButton(post){
      this.manageSelectedItems({
        resourceType: 'post',
        actionType: 'remove',
        item: post.id
      })
    }
  }
})
</script>

<style scoped>
@import "./styles/manage-post-edit-selected-list-item.css";
</style>