import { createStore } from 'vuex';
import { AuthStoreModule, AuthStoreState } from '../auth/auth.store';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { localStoragePlugin } from './app.store.plugin';
import { LayoutStoreModule, LayoutStoreState } from './layout/layout.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
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
    auth: AuthStoreModule,
  },

  plugins: [localStoragePlugin],
});

/**
 * 默认导出
 */
export default store;
