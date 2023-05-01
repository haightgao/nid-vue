import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayoutStoreState {
  theme: string;
  sideSheetComponent: string;
  sideSheetProps: any;
  sideSheetTouchdown: boolean;
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
    }
  },

  /**
   * 动作
   */
  actions: {},
};
