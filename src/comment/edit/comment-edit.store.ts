import { Module } from 'vuex';
import { RootState } from '@/app/app.store'
import { apiHttpClient } from '@/app/app.service'

export interface UpdateCommentOptions {
  commentId?: number;
  content?: string;
}

export interface CommentEditStoreState {
    loading: boolean;
}

export const commentEditStoreModule: Module<CommentEditStoreState, RootState> = {
    namespaced: true,

    state: {
        loading: false,
    } as CommentEditStoreState,

    getters: {
        loading(state) {
            return state.loading;
        },
    },

    mutations: {
        setLoading(state, data) {
            state.loading = data
        },
    },

    actions: {
        async updateComment ({commit},options: UpdateCommentOptions) {
            commit('setLoading', true);

            const {commentId, content} = options

            try {
                const response = await apiHttpClient.patch(`comments/${commentId}`,{
                  content
                })
                commit('setLoading', false)
              return response
            } catch(error){
                commit('setLoading', false)

                throw error.response
            }
        }
    }
}