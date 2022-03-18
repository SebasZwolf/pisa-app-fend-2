import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    { 
      path: '/', 
      name: 'login',
      component: () => import(/* webpackChunkName: "aa" */ '@/views/Login.vue') 
    },
    { 
      path: '/school', 
      name: 'school',
      component: () => import(/* webpackChunkName: "bb" */ '@/views/School.vue') 
    },
    { 
      path: '/topic', 
      name: 'topic',
      component: () => import(/* webpackChunkName: "bb" */ '@/views/Topic.vue') 
    },
  ]
})

export default router