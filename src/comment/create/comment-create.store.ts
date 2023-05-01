import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface CommentCreateStoreState {
  loading: boolean;
}

export interface CreateCommentOptions {
  postId?: number;
  content?: string;
}

export const commentCreateStoreModule: Module<CommentCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
  } as CommentCreateStoreState,

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
    async createComment({ commit,dispatch }, options: CreateCommentOptions = {}) {
      commit('setLoading', true);

      const {postId, content} = options



      try {
        const response = await apiHttpClient.post(`comments`, {
          postId,
          content,
        });
        commit('setLoading', false);

        commit('comment/index/setNextPage',1, {root: true })

        dispatch('comment/index/getComments', {filter: {post: postId}}, {root: true})

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};