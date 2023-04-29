import { Module} from 'vuex';
import { RootState } from '@/app/app.store';
import { fileShowStoreModule, FileShowStoreState } from '@/file/show/file-show.store';

export interface FileStoreState {
  show: FileShowStoreState;
}

export const fileStoreModule: Module<FileStoreState, RootState> = {
  namespaced: true,

  state: {

  } as FileStoreState,

  getters: {},

  mutations: {},

  actions: {},

  modules: {
    show: fileShowStoreModule
  },
}