import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import {
  User,
  userShowStoreModule,
  UserShowStoreState,
} from './show/user-show.store';
import {
  userAccountStoreModule,
  UserAccountStoreState,
} from './account/user-account.store';

export interface UserStoreState {
  currentUser: User | null;
  show: UserShowStoreState;
  accout: UserAccountStoreState;
}

export const userStoreModule: Module<UserStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    currentUser: null,
  } as UserStoreState,

  /**
   * 获取器
   */
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setCurrentUser(state, data) {
      state.currentUser = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getCurrentUser({ commit, dispatch }, userId) {
      try {
        const response = await dispatch('user/show/getUserById', userId, {
          root: true,
        });

        commit('setCurrentUser', response.data);

        return response;
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw (error as any).response;
      }
    },
  },

  modules: {
    show: userShowStoreModule,
    account: userAccountStoreModule,
  },
};
