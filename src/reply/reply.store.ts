import { Module } from 'vuex';
import { RootState } from '@/app/app.store'
import { replyIndexStoreModule, ReplyIndexStoreState } from '@/reply/index/reply-index.store';

export interface ReplyStoreState {
  index: ReplyIndexStoreState;
}

export const replyStoreModule: Module<ReplyStoreState, RootState> = {
    namespaced: true,
    
    state: {} as ReplyStoreState,

    modules: {
      index: replyIndexStoreModule,
    }
}