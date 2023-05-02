import { Module } from 'vuex';
import { RootState } from '../app/app.store';
import {
  postCreateStoreModule,
  PostCreateStoreState,
} from './create/post-create.store';
import { postIndexStoreModule, PostIndexStoreState } from './index/post-index.store';
import { postShowStoreModule, PostShowStoreState } from './show/post-show.store';
import { postEditStoreModule, PostEditStoreState } from '@/post/edit/post-edit.store';

export interface PostStoreState {
  create: PostCreateStoreState;
  edit: PostEditStoreState;
  index: PostIndexStoreState;
  show: PostShowStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    create: postCreateStoreModule,
    edit: postEditStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
  },
};
