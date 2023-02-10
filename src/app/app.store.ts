import { createStore } from 'vuex';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { localStoragePlugin } from './app.store.plugin';
import { LayoutStoreModule, LayoutStoreState } from './layout/layout.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: '宁皓网',
  } as RootState,

  modules: {
    post: postStoreModule,
    layout: LayoutStoreModule,
  },

  plugins: [localStoragePlugin],
});

/**
 * 默认导出
 */
export default store;
