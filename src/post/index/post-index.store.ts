import { Module } from 'vuex';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { RootState } from '@/app/app.store';
import { User } from '@/user/show/user-show.store';
import {  POSTS_PER_PAGE } from '@/app/app.config';
import { StringifiableRecord } from 'query-string';
import { postFileProcess } from '@/post/post.service';

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
  filter: {[name: string]: string} | null;
}

export interface GetPostOptions {
  sort?: string;
  filter?: {[name: string]: string};
}

export interface FilterItem{
  title?: string;
  value?: string;
}

export const postIndexStoreModule: Module<PostIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    posts: [],
    layout: '',
    nextPage: 1,
    totalPages: 1,
    queryString:'',
    filter: null,
  } as PostIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },

    posts(state) {
      return state.posts.map(post => postFileProcess(post));
    },

    layout(state) {
      return state.layout;
    },

    hasMore(state) {
      return state.totalPages - state.nextPage >= 0;
    },

    filterItems(state){
      const items: Array<FilterItem> = [];

      if(state.filter){
        Object.keys(state.filter).forEach(filterName => {
          const item: FilterItem = {}

          switch (filterName) {
            case 'tag':
              item.title = '标签';
              break
          }

          if(item.title && state.filter){
            item.value = state.filter[filterName]
            items.push(item)
          }
        })
      }
      return items;
    }
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
    },

    setFilter(state, data){
      state.filter = data;
    }
  },

  actions: {
    async getPosts({ commit, state, dispatch }, options: GetPostOptions = {}) {
      let getPostsQueryString = '';

      if(Object.keys(options).length){
        getPostsQueryString = await dispatch('getPostsPreProcess', options);
      }else{
        getPostsQueryString = state.queryString
      }

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
      commit('setFilter', options.filter || null);

      const getPostsQueryObject: StringifiableRecord = {
        sort: options.sort,
        ...state.filter,
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
