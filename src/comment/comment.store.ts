import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { commentIndexStoreModule, CommentIndexStoreState } from '@/comment/index/comment-index.store';
import { commentCreateStoreModule, CommentCreateStoreState } from '@/comment/create/comment-create.store';

export interface CommentStoreState {
  create: CommentCreateStoreState;
  index: CommentIndexStoreState;
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  namespaced: true,

  state: {} as CommentStoreState,

  modules: {
    create: commentCreateStoreModule,
    index: commentIndexStoreModule
  }
};