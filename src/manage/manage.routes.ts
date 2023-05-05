import { RouteRecordRaw } from 'vue-router';
import Manage from '@/manage/manage.vue';
import ManagePost from '@/manage/post/manage-post.vue';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'manage',
    path: '/manage',
    component: Manage,
    props: true,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        name: 'managePost',
        path: 'post',
        component: ManagePost,
      },
    ],
  },
];

export default routes;
