import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { commentIndexStoreModule, CommentIndexStoreState } from '@/comment/index/comment-index.store';

export interface CommentStoreState {
  index: CommentIndexStoreState;
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  namespaced: true,

  state: {} as CommentStoreState,

  modules: {
    index: commentIndexStoreModule
  }
};