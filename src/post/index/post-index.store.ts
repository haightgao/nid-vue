import { Module } from 'vuex';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { RootState } from '@/app/app.store';
import { User } from '@/user/show/user-show.store';
import { API_BASE_URL, POSTS_PER_PAGE } from '@/app/app.config';
import { StringifiableRecord } from 'query-string';

export interface PostListItem {
  id: number;
  title: string;
  content: string;
  user: User;
  totalComments: number;
  totalLikes: number;
  file: {
    id: number;
    width: number;
    height: number;
    orientation: string;
    size: {
      thumbnail: string;
      medium: string;
      large: string;
    };
  };
  tags: [
    {
      id: number;
      name: string;
    },
  ];
}

export interface PostIndexStoreState {
  loading: boolean;
  posts: Array<PostListItem>;
  layout: string;
  nextPage: number;
  totalPages: number;
  queryString: string;
}

export interface GetPostOptions {
  sort?: string;
}

export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    posts: [],
    layout: '',
    nextPage: 1,
    totalPages: 1,
    queryString:''
  } as PostIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    posts(state) {
      return state.posts.map(post => {
        let { file } = post;
        if (file) {
          const { id: fileId, width, height } = file;
          const fileBseUrl = `${API_BASE_URL}/files/${fileId}/serve`;
          const orientation = width > height ? 'horizontal' : 'portrait';

          file = {
            ...file,
            orientation,
            size: {
              thumbnail: `${fileBseUrl}?size=thumbnail`,
              medium: `${fileBseUrl}?size=medium`,
              large: `${fileBseUrl}?size=large`,
            },
          };

          post = {
            ...post,
            file,
          };
        }
        return post;
      });
    },

    layout(state) {
      return state.layout;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setPosts(state, data) {
      state.posts = data;
    },

    setLayout(state, data) {
      state.layout = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPages(state, data) {
      state.totalPages = data;
    },

    setQueryString(state, data){
      state.queryString = data;
    }
  },

  actions: {
    async getPosts({ commit, state, dispatch }, options: GetPostOptions = {}) {

      const getPostsQueryString = await dispatch('getPostsPreProcess', options);

      try {
        const response = await apiHttpClient.get(
          `/posts?page=${state.nextPage}&sort=${getPostsQueryString}`,
        );

        dispatch('getPostsPostProcess', response);

        return response;
      } catch (error) {
        commit('setLoading', false);
        throw (error as { response: string }).response;
      }
    },

    getPostsPreProcess({commit, state}, options: GetPostOptions = {}){
      commit('setLoading', true);

      const getPostsQueryObject: StringifiableRecord = {
        sort: options.sort
      }

      const getPostsQueryString = queryStringProcess(getPostsQueryObject);

      if(getPostsQueryString !== state.queryString){
        commit('setNextPage',1);
      }

      commit('setQueryString', getPostsQueryString);
      return getPostsQueryString
    },

    getPostsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setPosts', response.data);
      } else {
        commit('setPosts', [...state.posts, ...response.data]);
      }

      commit('setLoading', false);

      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(total / POSTS_PER_PAGE);

      commit('setTotalPages', totalPages);
      commit('setNextPage');
    },
  },
};
