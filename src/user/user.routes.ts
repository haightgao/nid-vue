import { RouteRecordRaw } from 'vue-router';
import UserShow from './show/user-show.vue';
import UserComments from './show/components/user-comments.vue';
import UserLiked from './show/components/user-liked.vue';
import UserPosts from './show/components/user-posts.vue';
import UserReplies from './show/components/user-replies.vue';
import UserAccount from './account/user-account.vue';

/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
  {
    name: 'userShow',
    path: '/users/:userId',
    component: UserShow,
    props: true,
    children: [
      {
        name: 'userPosts',
        path: '',
        component: UserPosts,
      },
      {
        name: 'userLiked',
        path: 'liked',
        component: UserLiked,
      },
      {
        name: 'userComments',
        path: 'comments',
        component: UserComments,
      },
      {
        name: 'userReplies',
        path: 'replies',
        component: UserReplies,
      },
      {
        name: 'userAccount',
        path: 'account',
        component: UserAccount,
      },
    ],
  },
];

/**
 * 默认导出
 */
export default routes;
