import { Module} from 'vuex';
import { RootState } from '@/app/app.store';
import { fileShowStoreModule, FileShowStoreState } from '@/file/show/file-show.store';
import { fileCreateStoreModule, FileCreateStoreState } from '@/file/create/file-create.store';

export interface FileStoreState {
  create: FileCreateStoreState;
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
    create: fileCreateStoreModule,
    show: fileShowStoreModule
  },
}