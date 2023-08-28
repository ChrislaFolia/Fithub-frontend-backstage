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
      path: '/testUploadImg',
      name: 'testUploadImg',
      component: () => import('../views/testUploadImg.vue')
    },
    {
      path: '/testLoadImg',
      name: 'testLoadImg',
      component: () => import('../views/testLoadImg.vue')
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/employee.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('../views/employee.vue')
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: () => import('../views/employee.vue')
    }
    ,
    {
      path: '/rentorder',
      name: 'rentorder',
      component: () => import('../views/employee.vue')
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: () => import('../views/classroom.vue')
    }
  ]
})

export default router
