import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PostEditStoreState {
  tags: Array<TagItem>;
  loading: boolean;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
}

export interface UpdatePostOptions {
  postId?: number;
  data?: UpdatePostData;
}

export interface TagItem {
  id?: number;
  name?: string;
}

export interface CreatePostTagOptions {
  postId?: number;
  data?: TagItem;
}

export interface DeletePostTagOptions {
  postId?: number;
  tagId?: number;
}

export const postEditStoreModule: Module<PostEditStoreState, RootState> = {
  namespaced: true,

  state: {
    tags: [],
    loading: false,
  } as PostEditStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    tags(state) {
      return state.tags;
    },
    hasTag(state) {
      return state.tags && state.tags.length;
    },
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
  },

  actions: {
    async updatePost({ commit }, options: UpdatePostOptions) {
      commit('setLoading', true);

      const { postId, data } = options;

      try {
        const response = await apiHttpClient.patch(`posts/${postId}`, data);
        commit('setLoading', false);
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    },

    async createPostTag({ commit, dispatch }, options: CreatePostTagOptions) {
      commit('setLoading', true);

      const { postId, data } = options;

      try {
        const response = await apiHttpClient.post(`posts/${postId}/tag`, data);

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });

        commit('setLoading', false);
        commit('setTags', post.tags);
        commit('post/index/setPostItem', post, { root: true });

        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    },

    async deletePostTag({ commit, dispatch }, options: DeletePostTagOptions) {
      commit('setLoading', true);

      const { postId, tagId } = options;

      try {
        const response = await apiHttpClient.delete(`posts/${postId}/tag`, {
          data: { tagId },
        });

        const { data: post } = await dispatch('post/show/getPostById', postId, {
          root: true,
        });
        commit('setLoading', false);
        commit('setTags', post.tags);
        commit('post/index/setPostItem', post, { root: true });

        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    },
  },
};
