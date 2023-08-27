import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/department.vue')
    },
    {
      path: '/coupons',
      name: 'coupons',
      component: () => import('../views/coupons.vue')
    },
    {
      path: '/couponcategories',
      name: 'couponcategories',
      component: () => import('../views/couponcategories.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/activity.vue')
    },
    {
      path: '/rentorder',
      name: 'rentorder',
      component: () => import('../views/rentorder.vue')
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: () => import('../views/classroom.vue')
    }
  ]
})

export default router
