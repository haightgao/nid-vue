import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface PostEditStoreState {
  loading: boolean;
}

export interface UpdatePostData{
  title?: string;
  content?: string;
}

export interface UpdatePostOptions {
  postId?: number;
  data?: UpdatePostData;
}

export const postEditStoreModule: Module<PostEditStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false
  } as PostEditStoreState,

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
    async updatePost({commit}, options: UpdatePostOptions) {
      commit('setLoading', true);

      const {postId, data} = options

      try {
        const response = await apiHttpClient.patch(`posts/${postId}`, data);
        commit('setLoading', false);
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}