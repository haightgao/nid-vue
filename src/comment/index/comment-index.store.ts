import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { filterProcess } from '@/post/post.service';
import { StringifiableRecord } from 'query-string';
import { COMMENTS_PER_PAGE } from '@/app/app.config';

export interface CommentListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
  post: {
    id: number;
    title: string;
  };
  totalReplies: number | null;
}

export type Comments = CommentListItem[];

export interface CommentIndexStoreState {
  loading: boolean;
  comments: Comments;
  filter: { [name: string]: string } | null;
  queryString: string;
  nextPage: number;
  totalPages: number;
}

export interface GetCommentsOptions {
  filter?: { [name: string]: string };
}

export const commentIndexStoreModule: Module<
  CommentIndexStoreState,
  RootState
> = {
  namespaced: true,

  state: {
    loading: false,
    comments: [],
    filter: null,
    queryString: '',
    nextPage: 1,
    totalPages: 1,
  } as CommentIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
    comments(state) {
      return state.comments;
    },
    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setComments(state, data) {
      state.comments = data;
    },

    setFilter(state, data) {
      state.filter = filterProcess(data);
    },

    setQueryString(state, data) {
      state.queryString = data;
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

    removeCommentItem(state, data) {
      state.comments = state.comments.filter(item => item.id !== data);
    },

    increaseTotalReplies(state, data) {
      state.comments = state.comments.map(item => {
        if (item.id === data) {
          if (item.totalReplies) {
            item.totalReplies++;
          } else {
            item.totalReplies = 1;
          }
        }
        return item;
      });
    },

    decreaseTotalReplies(state, data) {
      state.comments = state.comments.map(item => {
        if (item.id === data) {
          if (item.totalReplies) {
            item.totalReplies--;
          }
        }
        return item;
      });
    },

    addCommentItem(state, data) {
      state.comments = [data, ...state.comments];
    },

    setCommentContent(state, data) {
      const { id: commentId, content } = data;

      state.comments.map(comment => {
        if (comment.id === commentId) {
          comment.content = content;
        }

        return comment;
      });
    },
  },

  actions: {
    async getComments(
      { commit, state, dispatch },
      options: GetCommentsOptions,
    ) {
      let getCommentsQueryString = '';

      if (Object.keys(options).length) {
        getCommentsQueryString = await dispatch(
          'getCommentsPreProcess',
          options,
        );
      } else {
        getCommentsQueryString = state.queryString;
      }

      try {
        const response = await apiHttpClient.get(
          `comments?page=${state.nextPage}&${getCommentsQueryString}`,
        );
        dispatch('getCommentsPostProcess', response);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },

    getCommentsPreProcess({ commit, state }, options: GetCommentsOptions) {
      commit('setLoading', true);
      commit('setFilter', options.filter);

      const getCommentsQueryObject: StringifiableRecord = {
        ...state.filter,
      };

      const getCommentsQueryString = queryStringProcess(getCommentsQueryObject);

      if (state.queryString !== getCommentsQueryString) {
        commit('setNextPage', 1);
      }

      commit('setQueryString', getCommentsQueryString);

      return getCommentsQueryString;
    },

    getCommentsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setComments', response.data);
      } else {
        commit('setComments', [...state.comments, ...response.data]);
      }

      commit('setLoading', false);

      const total =
        response.headers['X-Total-Count'] || response.headers['x-total-count'];

      const totalPages = Math.ceil(total / COMMENTS_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');

      commit('layout/setSideSheetTouchdown', false, { root: true });

      commit('user/show/setTouchDown', false, { root: true });
    },
  },
};
