import { createRouter, createWebHistory } from 'vue-router'
import { authToken } from '@/api/login'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/backstageView.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue')
    },
    {
      path: '/navbartop',
      name: 'navbartop',
      component: () => import('../components/NavbarTop.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/navbarleft',
      name: 'navbarleft',
      component: () => import('../components/NavbarLeft.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/department.vue'),
      meta:{
        needLogin: true
      }
      
    },
    {
      path: '/testUploadImg',
      name: 'testUploadImg',
      component: () => import('../views/testUploadImg.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/testLoadImg',
      name: 'testLoadImg',
      component: () => import('../views/testLoadImg.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/employee',
      name: 'employee',
      component: () => import('../views/employeeTest.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('../views/employee.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: () => import('../views/employee.vue'),
      meta:{
        needLogin: true
      }
    }
    ,
    {
      path: '/rentorder',
      name: 'rentorder',
      component: () => import('../views/employee.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/classroom',
      name: 'classroom',
      component: () => import('../views/classroom.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/specialty',
      name: 'specialty',
      component: () => import('../views/specialty.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/coachspecialty',
      name: 'coachspecialty',
      component: () => import('../views/coachspecialty.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/jobtitle',
      name: 'jobtitle',
      component: () => import('../views/jobtitle.vue'),
      meta:{
        needLogin: true
      }
    }, 
    {
      path: '/backstageaccount',
      name: 'backstageaccount',
      component: () => import('../views/backstageaccount.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/coachpic',
      name: 'coachpic',
      component: () => import('../views/coachpic.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/receiver',
      name: 'receiver',
      component: () => import('../views/Receiver.vue'),
      meta:{
        needLogin: true
      }
    },
    {
      path: '/sender',
      name: 'sender',
      component: () => import('../views/Sender.vue'),
      meta:{
        needLogin: true
      }
    }
  ]
})

router.beforeResolve( async to=>{
  if(to.meta.needLogin){
      const isLogin = window.localStorage.getItem("isLogin")
      console.log('login')
      if(!isLogin){
        console.log('back to login1')
        return {name: "login"}
      } 
      
      const token = window.localStorage.getItem("token")
      const authResult = await authToken(token)
      if(!authResult.status){
        console.log('back to login2')
        return {name: "login"}
      } 
  }
})

export default router
