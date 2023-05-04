import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { PostListItem } from '@/post/index/post-index.store';

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
    getSelectedPosts({ state, commit, rootGetters }) {
      const selectedPosts = state.selectItems.map(item =>
        rootGetters['post/index/posts'].find(
          (post: PostListItem) => post.id === item,
        ),
      );

      commit('setSelectedPosts', selectedPosts)

      return selectedPosts
    },

    manageSelectItems({commit, state, dispatch}, options: ManageSelectItemsOptions){
      const {resourceType, item, actionType} = options

      let items: Array<number>

      switch (actionType){
        case 'add':
          items = [...state.selectItems, item]
          break
        case 'remove':
          items = state.selectItems.filter(id => id !== item)
          break
        case 'reset':
          items = []
          break
        default:
          items = [item]
          break
      }

      commit('setSelectItems', items)

      switch (resourceType){
        case 'post':
          dispatch('getSelectedPosts')
          break
      }
    }
  },
};
