import { createStore } from 'vuex';
import { AuthStoreModule, AuthStoreState } from '../auth/auth.store';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { UserShowStoreState } from '../user/show/user-show.store';
import { userStoreModule } from '../user/user.store';
import { localStoragePlugin } from './app.store.plugin';
import { LayoutStoreModule, LayoutStoreState } from './layout/layout.store';
import {
  appNotificationStoreModule,
  AppNotificationStoreState,
} from './notification/app-notification.store';
import {
  appToolbarStoreModule,
  AppToolbarStoreState,
} from './toolbar/app-toolbar.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayoutStoreState;
  auth: AuthStoreState;
  notification: AppNotificationStoreState;
  user: UserShowStoreState;
  toolbar: AppToolbarStoreState;
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
    user: userStoreModule,
    toolbar: appToolbarStoreModule,
  },

  plugins: [localStoragePlugin],
});

/**
 * 默认导出
 */
export default store;
