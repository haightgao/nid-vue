import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import appStore from './app.store';

/**
 * 工具栏项目守卫
 * @param to
 * @param from
 * @param next
 */
export const appToolbarItemGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  let showPostListLayoutSwitcher = false;

  switch (to.name) {
    case 'home':
    case 'postIndex':
      showPostListLayoutSwitcher = true;
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );

  next();
};