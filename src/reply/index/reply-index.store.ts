import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface ReplyListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
}

export type Replies = {
  [commentId: number]: Array<ReplyListItem>;
};

export interface ReplyIndexStoreState {
  loading: boolean;
  replies: Replies;
}

export const replyIndexStoreModule: Module<ReplyIndexStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
    replies: {},
  } as ReplyIndexStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
    replies: state => (commentId: number) => {
      return state.replies[commentId];
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setReplies(state, data) {
      state.replies = { ...state.replies, ...data };
    },

    removeReplyItem(state, data) {
      const { commentId, replyId } = data;

      state.replies[commentId] = state.replies[commentId].filter(
        item => item.id !== replyId,
      );
    },

    addReplyItem(state, data) {
      const commendId = data.repliedComment.id;
      const commentReplies = state.replies[commendId];

      state.replies[commendId] = [...commentReplies, data];
    },

    setReplyItemContent(state, data) {
      const {
        id: replyId,
        repliedComment: { id: commentId },
        content,
      } = data;

      const commentReplies = state.replies[commentId];

      state.replies[commentId] = commentReplies.map(reply => {
        if (reply.id === replyId) {
          reply.content = content;
        }

        return reply;
      });
    },
  },

  actions: {
    async getReplies({ commit }, commentId: number) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `comments/${commentId}/replies`,
        );
        commit('setReplies', {
          [commentId]: response.data,
        });
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
