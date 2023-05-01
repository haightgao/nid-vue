import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface CommentDestroyStoreState {
  loading: boolean;
}

export interface DeleteCommentOptions {
  commentId?: number;
}

export const commentDestroyStoreModule: Module<CommentDestroyStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
  } as CommentDestroyStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
  },

  actions: {
    async deleteComment({ commit }, options: DeleteCommentOptions = {}) {
      commit('setLoading', true);

      const {commentId} = options

      try {
        const response = await apiHttpClient.delete(`comments/${commentId}`);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};