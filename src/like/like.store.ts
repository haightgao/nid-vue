import { Module } from 'vuex';
import { RootState } from '@/app/app.store'
import { likeCreateStoreModule, LikeCreateStoreState } from '@/like/create/like-create.store';
import { likeDestroyStoreModule, LikeDestroyStoreState } from '@/like/destroy/like-destroy.store';

export interface LikeStoreState {
    create: LikeCreateStoreState;
    destroy: LikeDestroyStoreState;
}

export const likeStoreModule: Module<LikeStoreState, RootState> = {
    namespaced: true,

    state: {
    } as LikeStoreState,

    modules: {
        create: likeCreateStoreModule,
        destroy: likeDestroyStoreModule,
    }
}