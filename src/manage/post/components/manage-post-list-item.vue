<template>
  <div :class="managePostListItemClasses">
    <ManagePostListItemMedia :item="item" @click="onClickPostListItemMedia($event, item)"/>
    <ManagePostListItemContent :item="item"/>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {mapGetters,mapActions} from 'vuex';
import ManagePostListItemMedia from '@/manage/post/components/manage-post-list-item-media.vue';
import ManagePostListItemContent from '@/manage/post/components/manage-post-list-item-content.vue';

export default defineComponent({
  name: 'ManagePostListItem',
  components: { ManagePostListItemContent, ManagePostListItemMedia },

  props: {
    item: {
      type:Object
    }
  },

  computed: {
    ...mapGetters({
      isSelected: 'manage/select/isSelected'
    }),

    managePostListItemClasses(){
      return ['manage-post-list-item', {selected: this.isSelected(this.item.id)}];
    }
  },

  methods:{
    ...mapActions({
      manageSelectedItems: 'manage/select/manageSelectItems'
    }),

    onClickPostListItemMedia(event, post){
      let actionType
      if(event.metaKey || event.ctrlKey){
        actionType = 'add'
      }
      if(this.isSelected(post.id)){
        actionType = 'remove'
      }
      this.manageSelectedItems({
        resourceType: 'post',
        item: post.id,
        actionType
      });
    }
  }
})
</script>

<style scoped>
@import "./styles/manage-post-list-item.css";
</style>