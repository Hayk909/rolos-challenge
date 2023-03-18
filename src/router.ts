import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Posts from '@/views/Posts/Posts.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Posts,
  },
  {
    path: '/posts/:postId',
    name: 'post',
    component: () => import('@/views/Posts/Post.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
