import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface PostDestroyStoreState {
  loading: boolean;
}

export interface DeletePostOptions {
  postId?: number;
}

export const postDestroyStoreModule: Module<PostDestroyStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false
  } as PostDestroyStoreState,

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
    async deletePost({commit}, options: DeletePostOptions) {
      commit('setLoading', true);

      const {postId} = options

      try {
        const response = await apiHttpClient.delete(`posts/${postId}`);
        commit('setLoading', false);
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}