import { createStore } from 'vuex';
import { AuthStoreModule, AuthStoreState } from '../auth/auth.store';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { localStoragePlugin } from './app.store.plugin';
import { LayoutStoreModule, LayoutStoreState } from './layout/layout.store';
import {
  appNotificationStoreModule,
  AppNotificationStoreState,
} from './notification/app-notification.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
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
    notification: appNotificationStoreModule,
  },

  plugins: [localStoragePlugin],
});

/**
 * 默认导出
 */
export default store;
