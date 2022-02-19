import { createRouter, createWebHistory } from 'vue-router'

import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/composables/useUserStore';

import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import PublicTimeline from '@/views/PublicTimeline.vue';
import MyTimeline from '@/views/MyTimeline.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'my timeline',
      component: MyTimeline,
      meta: {
        requiresAuth: true,
        authRedirect: '/public'
      }
    },
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
  const { clearOrIncreaseMessages } = useMessageStore();
  clearOrIncreaseMessages();

  if (to.meta.requiresAuth) {
    const { isLoggedIn } = useUserStore();
    console.log(to.meta.authRedirect as string, isLoggedIn.value);

    if (!isLoggedIn.value) {
      return { path: to.meta.authRedirect as string || '/login' };
    }
  }
});

export default router
