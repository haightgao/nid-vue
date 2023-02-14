import { RouteRecordRaw } from 'vue-router';
import AuthLogin from './login/auth-logiin.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: AuthLogin,
    props: true,
  },
];

/**
 * 默认导出
 */
export default routes;
