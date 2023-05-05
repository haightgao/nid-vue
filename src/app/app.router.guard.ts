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
  let showPostShowNavigator = false;
  let showSideSheetItem = false;

  switch (to.name) {
    case 'home':
    case 'postIndex':
    case 'postIndexPopular':
    case 'userPosts':
    case 'userLiked':
      showPostListLayoutSwitcher = true;
      break;
    case 'postShow':
      showPostShowNavigator = true;
      showSideSheetItem = true;
      break;
    case 'managePost':
      showSideSheetItem = true;
      break;
  }

  appStore.commit(
    'toolbar/setShowPostListLayoutSwitcher',
    showPostListLayoutSwitcher,
  );

  appStore.commit('toolbar/setShowPostShowNavigator', showPostShowNavigator);

  appStore.commit('toolbar/setShowSideSheetItem', showSideSheetItem);

  next();
};

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!appStore.getters['auth/isLoggedIn']) {
      appStore.dispatch('notification/pushMessage', {
        content: '请先登录',
      });

      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
};
