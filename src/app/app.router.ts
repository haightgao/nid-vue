import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRouters from '@/user/user.routes';
import manageRoutes from '@/manage/manage.routes';
import { appToolbarItemGuard, authGuard } from './app.router.guard';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...appRoutes,
    ...postRoutes,
    ...authRoutes,
    ...userRouters,
    ...manageRoutes,
  ],
});

router.beforeEach(appToolbarItemGuard);

router.beforeEach(authGuard);

/**
 * 默认导出
 */
export default router;
