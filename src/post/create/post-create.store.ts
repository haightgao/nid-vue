import {Module} from 'vuex';
import {RootState} from '@/app/app.store';
import {apiHttpClient} from '@/app/app.service';

export interface PostCreateStoreState {
  loading: boolean;
  title: string;
  content: string;
  postId: number | null;
  unsaved: boolean;
}

export interface CreatePostData {
  title: string;
  content?: string;
}
export interface CreatePostOptions {
  data?: CreatePostData;
}

export const postCreateStoreModule: Module<PostCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    title: '',
    content: '',
    postId: null,
    unsaved: false,
  } as PostCreateStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
    title(state) {
      return state.title;
    },
    content(state) {
      return state.content;
    },
    postId(state) {
      return state.postId;
    },
    unsaved(state) {
      return state.unsaved;
    }
  },

  mutations: {
    setLoading(state, loading) {
      state.loading = loading;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setContent(state, content) {
      state.content = content;
    },
    setPostId(state, postId) {
      state.postId = postId;
    },
    setUnsaved(state, unsaved) {
      state.unsaved = unsaved;
    }
  },

  actions: {
    async createPost({commit}, options: CreatePostOptions) {
      commit('setLoading', true);

      const {data} = options

      try {
        const response = await apiHttpClient.post(`posts`, data);
        commit('setLoading', false);
        commit('setPostId', response.data.insertId)
        return response;
      } catch (e) {
        commit('setLoading', false);
        throw e.response;
      }
    }
  }
}