import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface AppNotificationMessage {
  id: number;
  content: string;
  icon: string;
  duration: number;
}

export interface AppNotificationStoreState {
  messages: Array<AppNotificationMessage>;
}

export const appNotificationStoreModule: Module<
  AppNotificationStoreState,
  RootState
> = {
  namespaced: true,

  state: {
    messages: [],
  } as AppNotificationStoreState,

  getters: {
    messages(state) {
      return state.messages;
    },
  },

  mutations: {
    addMessage(state, data) {
      if(!state.messages.some(message => message.content === data.content)){
        state.messages = [data, ...state.messages];
      }
    },

    deleteMessage(state, data) {
      state.messages = state.messages.filter(message => message.id !== data);
    },
  },

  actions: {
    pushMessage({ commit, dispatch }, data) {
      const id = Date.now();

      const message = {
        id,
        ...data,
      };
      commit('addMessage', message);

      dispatch('dismissMessage', message);
    },

    dismissMessage({ commit }, message) {
      const timeout = message.duration ? message.duration : 3000;

      setTimeout(() => {
        commit('deleteMessage', message.id);
      }, timeout);
    },
  },
};
