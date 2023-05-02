import { Module } from 'vuex';
import { RootState } from '@/app/app.store'
import { replyIndexStoreModule, ReplyIndexStoreState } from '@/reply/index/reply-index.store';
import { replyCreateStoreModule, ReplyCreateStoreState } from '@/reply/create/reply-create.store';

export interface ReplyStoreState {
  index: ReplyIndexStoreState;
  create: ReplyCreateStoreState;
}

export const replyStoreModule: Module<ReplyStoreState, RootState> = {
    namespaced: true,
    
    state: {} as ReplyStoreState,

    modules: {
      index: replyIndexStoreModule,
      create: replyCreateStoreModule,
    }
}