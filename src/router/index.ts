import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import PublicTimeline from '@/views/PublicTimeline.vue';
import { useMessageStore } from '@/stores/message';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*{
      path: '/',
      name: 'my timeline',
      component: MyTimeline
    },*/
    {
      path: '/public',
      name: 'public timeline',
      component: PublicTimeline
    },
    /*{
      path: '/user/:username',
      name: 'user timeline',
      component: UserTimeline
    },*/
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ],
});

router.beforeEach((to, from) => {
  const { clearErrors } = useMessageStore();

  clearErrors();
});

export default router
