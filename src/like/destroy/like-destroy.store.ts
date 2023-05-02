import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface LikeDestroyStoreState {
  loading: boolean;
}

export interface DeleteUserLikePostOptions {
  postId?: number;
}

export const likeDestroyStoreModule: Module<LikeDestroyStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false
  } as LikeDestroyStoreState,

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
    async deleteUserLikePost({commit}, options: DeleteUserLikePostOptions) {
      commit('setLoading', true);

      const {postId} = options

      try {
        const response = await apiHttpClient.delete(`posts/${postId}/like`);
        commit('setLoading', false);
        commit('post/index/setPostItemLiked',{postId, liked: 0},{root: true})
        commit('post/index/setPostItemTotalLikes',{postId, actionType: 'decrease'},{root: true})
        commit('post/show/setPostLiked',{postId, liked: 0},{root: true})
        commit('post/show/setPostTotalLikes',{postId, actionType: 'decrement'},{root: true})
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }

  }
}