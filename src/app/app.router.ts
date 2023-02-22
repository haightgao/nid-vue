import { createRouter, createWebHistory } from 'vue-router';
import appRoutes from './app.routes';
import postRoutes from '@/post/post.routes';
import authRoutes from '@/auth/auth.routes';
import userRouters from '@/user/user.routes';

/**
 * 创建路由器
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [...appRoutes, ...postRoutes, ...authRoutes, ...userRouters],
});

/**
 * 默认导出
 */
export default router;
