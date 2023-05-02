import { Module } from 'vuex';
import { RootState } from '../app/app.store';
import {
  postCreateStoreModule,
  PostCreateStoreState,
} from './create/post-create.store';
import { postIndexStoreModule, PostIndexStoreState } from './index/post-index.store';
import { postShowStoreModule, PostShowStoreState } from './show/post-show.store';
import { postEditStoreModule, PostEditStoreState } from '@/post/edit/post-edit.store';
import { postDestroyStoreModule, PostDestroyStoreState } from '@/post/destroy/post-destroy.store';

export interface PostStoreState {
  create: PostCreateStoreState;
  edit: PostEditStoreState;
  destroy: PostDestroyStoreState;
  index: PostIndexStoreState;
  show: PostShowStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    create: postCreateStoreModule,
    edit: postEditStoreModule,
    destroy: postDestroyStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
  },
};
