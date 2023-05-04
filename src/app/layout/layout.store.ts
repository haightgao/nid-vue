import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayoutStoreState {
  theme: string;
  sideSheetComponent: string;
  // eslint-disable-next-line
  sideSheetProps: any;
  sideSheetTouchdown: boolean;
  isSideSheetActive: boolean;
}

export const LayoutStoreModule: Module<LayoutStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    theme: 'light',
    sideSheetComponent: '',
    sideSheetProps: null,
    sideSheetTouchdown: false,
    isSideSheetActive: false,
  } as LayoutStoreState,

  /**
   * 获取器
   */
  getters: {
    theme(state) {
      return state.theme;
    },

    sideSheetComponent(state) {
      return state.sideSheetComponent;
    },

    sideSheetProps(state){
      return state.sideSheetProps
    },

    sideSheetTouchdown(state) {
      return state.sideSheetTouchdown;
    },

    isSideSheetActive(state) {
      return state.isSideSheetActive;
    }
  },

  /**
   * 修改器
   */
  mutations: {
    setTheme(state, data) {
      state.theme = data;
    },

    setSideSheetComponent(state, data) {
      state.sideSheetComponent = data;
    },

    resetSideSheet(state) {
      state.sideSheetComponent = '';
      state.sideSheetProps = null;
    },

    setSideSheetProps(state, data) {
      state.sideSheetProps = data;
    },

    setSideSheetTouchdown(state, data) {
      state.sideSheetTouchdown = data;
    },

    setIsSideSheetActive(state, data) {
      state.isSideSheetActive = data;
    }
  },

  /**
   * 动作
   */
  actions: {
    switchSideSheet({commit, state}){
      commit('setIsSideSheetActive', !state.isSideSheetActive)
    },

    closeSideSheet({commit}){
      commit('setIsSideSheetActive', false)
    },

    openSideSheet({commit}){
      commit('setIsSideSheetActive', true)
    }
  },
};
