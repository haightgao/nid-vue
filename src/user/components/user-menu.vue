<template>
  <div class="user-menu">
    <CloseButton @click="$emit('close')" />
    <div class="user-menu-header">
      <UserName :user="currentUser" />
    </div>
    <div class="user-menu-items" v-for="(menuItems, menuItemsIndex) in menu" :key="menuItemsIndex">
      <div class="user-menu-item" v-for="(item, index) in menuItems" :key="index" @click="$emit('close')">
        <router-link :to="item.linkTo" class="link">
          {{item.text}}
        </router-link>
      </div>
    </div>
    <div class="user-menu-footer">
      <button class="button block lowkey" @click="onClickLogoutButton">退出登录</button>
    </div>
  </div>
</template>

<script>
import {defineComponent}  from 'vue';
import {mapGetters, mapActions} from 'vuex';
import CloseButton from '@/app/components/close-button.vue';
import UserName from '@/user/components/user-name.vue';

export default defineComponent({
  name: 'UserMenu',
  /**
   * 属性
   */
  props: {},

  /**
   * 事件
   */
  emits: ['close'],

  /**
   * 数据
   * @returns {{}}
   */
  data(){
    return {}
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
    }),
    menu(){
      return [
        [{
          linkTo: {
            name: 'userPosts',
            params: {userId: this.currentUser.id}
          },
          text: '作品'
        },{
          linkTo: {
            name: 'userComments',
            params: {userId: this.currentUser.id}
          },
          text: '评论'
        }],
        [{
          linkTo: {
            name: 'userAccount',
            params: {userId: this.currentUser.id}
          },
          text: '帐户'
        }]
      ]
    }
  },

  created() {
    if(window){
      window.addEventListener('keyup', this.onKeyUpWindow)
    }
  },

  unmounted() {
    if(window){
      window.removeEventListener('keyup', this.onKeyUpWindow)
    }
  },

  /**
   * 方法
   */
  methods:{
    ...mapActions({
      logout: 'auth/logout'
    }),
    onKeyUpWindow(event){
      if(event.key === 'Escape'){
        this.$emit('close')
      }
    },
    onClickLogoutButton(){
      this.$emit('close')
      this.logout()
    }
  },

  components: { UserName, CloseButton}
})
</script>

<style scoped>
@import "./styles/user-menu.css";
</style>