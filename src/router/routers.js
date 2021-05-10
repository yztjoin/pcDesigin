
let routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/photoShow',
    name: 'photoShow',
    component: () => import('@/views/photoShow/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/observe',
    name: 'observe',
    component: () => import('@/views/observe/index.vue')
  }
]
export default routes
