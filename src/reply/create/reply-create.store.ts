import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface ReplyCreateStoreState {
  loading: boolean;
}

export interface CreateReplyOptions {
  commentId?: number;
  postId?: number;
  content?: string;
}

export const replyCreateStoreModule: Module<ReplyCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false
  } as ReplyCreateStoreState,

  getters: {
    loading(state) {
      return state.loading;
    }
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    }
  },

  actions: {
    async createReply({commit}, options: CreateReplyOptions) {
      commit('setLoading', true);

      const {commentId,postId,content} = options

      try {
        const response = await apiHttpClient.post(`comments/${commentId}/reply`, {
          postId,
          content,
        });
        commit('setLoading', false);
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}