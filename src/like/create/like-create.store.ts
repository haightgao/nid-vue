import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface LikeCreateStoreState {
  loading: boolean;
}

export interface CreateUserLikePostOptions {
   postId?: number;
}

export const likeCreateStoreModule: Module<LikeCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false
  } as LikeCreateStoreState,

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
    async createUserLikePost({commit}, options: CreateUserLikePostOptions) {
      commit('setLoading', true);

      const {postId} = options

      try {
        const response = await apiHttpClient.post(`posts/${postId}/like`);
        commit('setLoading', false);
        commit('post/index/setPostItemLiked',{postId, liked: 1},{root: true})
        commit('post/index/setPostItemTotalLikes',{postId, actionType: 'increase'},{root: true})
        commit('post/show/setPostLiked',{postId, liked: 1},{root: true})
        commit('post/show/setPostTotalLikes',{postId, actionType: 'increment'},{root: true})
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}