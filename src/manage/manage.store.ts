import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { manageSelectStoreModule, ManageSelectStoreState } from '@/manage/stores/manage-select.store';

export interface ManageStoreState {
  select: ManageSelectStoreState;
}

export const manageStoreModule: Module<ManageStoreState, RootState> = {
  namespaced: true,

  state: {
  } as ManageStoreState,

  modules: {
    select: manageSelectStoreModule,
  },
};
