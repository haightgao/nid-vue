import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PostListItem } from '@/post/index/post-index.store';
import { TagItem } from '@/post/edit/post-edit.store';

export interface ManageSelectStoreState {
  selectedPosts: Array<PostListItem>;
  selectItems: Array<number>;
}

export interface ManageSelectItemsOptions {
  resourceType: string;
  item: number;
  actionType: string;
}

export const manageSelectStoreModule: Module<
  ManageSelectStoreState,
  RootState
> = {
  namespaced: true,

  state: {
    selectedPosts: [],
    selectItems: [],
  } as ManageSelectStoreState,

  getters: {
    selectedPosts: state => state.selectedPosts,
    selectItems: state => state.selectItems,
    isSelected: state => (id: number) => state.selectItems.includes(id),
    isSingleSelect(state) {
      return state.selectItems.length === 1;
    },
    isMultiSelect(state) {
      return state.selectItems.length > 1;
    },
    hasSelected(state) {
      return state.selectItems.length > 0;
    },
    currentEditedPost(state) {
      return state.selectedPosts[state.selectedPosts.length - 1];
    },
    selectedPostTags(state) {
      const tags = state.selectedPosts.reduce((accumulator, post) => {
        return post.tags ? [...accumulator, ...post.tags] : accumulator;
      }, [] as Array<TagItem>);

      // 去重
      return Array.from(new Set(tags.map(tag => tag.id))).map(tagId =>
        tags.find(tag => tag.id === tagId),
      );
    },
  },

  mutations: {
    setSelectedPosts(state, payload: Array<PostListItem>) {
      state.selectedPosts = payload;
    },

    setSelectItems(state, payload: Array<number>) {
      state.selectItems = payload;
    },
  },

  actions: {
    getSelectedPosts({ state, commit, rootGetters, getters }) {
      const selectedPosts = state.selectItems.map(item =>
        rootGetters['post/index/posts'].find(
          (post: PostListItem) => post.id === item,
        ),
      );

      commit('setSelectedPosts', selectedPosts);

      commit('post/edit/setTags', getters.selectedPostTags, { root: true });

      return selectedPosts;
    },

    manageSelectItems(
      { commit, state, dispatch },
      options: ManageSelectItemsOptions,
    ) {
      const { resourceType, item, actionType } = options;

      let items: Array<number>;

      switch (actionType) {
        case 'add':
          items = [...state.selectItems, item];
          break;
        case 'remove':
          items = state.selectItems.filter(id => id !== item);
          break;
        case 'reset':
          items = [];
          break;
        default:
          items = [item];
          break;
      }

      commit('setSelectItems', items);

      switch (resourceType) {
        case 'post':
          dispatch('getSelectedPosts');
          break;
      }
    },

    async deleteSelectPosts({ commit, dispatch, getters }) {
      const posts = getters.selectedPosts as Array<PostListItem>;

      if (!posts.length) return;

      for (const post of posts) {
        try {
          await dispatch(
            'post/destroy/deletePost',
            { postId: post.id },
            { root: true },
          );

          await dispatch('manageSelectItems', {
            resourceType: 'post',
            actionType: 'remove',
            item: post.id,
          });

          commit('post/index/removePostItem', post, { root: true });
        } catch (error) {
          dispatch(
            'notification/pushMessage',
            { content: error.data.message },
            { root: true },
          );
        }
      }
    },
  },
};
