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
      path: '/course',
      name: 'course',
      component: () => import('../views/indexCourse.vue')
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('../views/indexClasses.vue')
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: () => import('../views/classroom.vue')
    }
  ]
})

export default router
