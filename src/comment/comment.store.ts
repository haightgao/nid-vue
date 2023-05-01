import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { commentIndexStoreModule, CommentIndexStoreState } from '@/comment/index/comment-index.store';
import { commentCreateStoreModule, CommentCreateStoreState } from '@/comment/create/comment-create.store';
import { commentDestroyStoreModule, CommentDestroyStoreState } from '@/comment/destroy/comment-destroy.store';
import { commentEditStoreModule, CommentEditStoreState } from '@/comment/edit/comment-edit.store';

export interface CommentStoreState {
  create: CommentCreateStoreState;
  index: CommentIndexStoreState;
  destroy: CommentDestroyStoreState;
  edit: CommentEditStoreState;
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  namespaced: true,

  state: {} as CommentStoreState,

  modules: {
    create: commentCreateStoreModule,
    index: commentIndexStoreModule,
    destroy: commentDestroyStoreModule,
    edit: commentEditStoreModule,
  }
};