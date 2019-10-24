import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryAdd from './views/CategoryAdd.vue'
import CategoryList from './views/CategoryList.vue'
import ItemsAdd from './views/ItemsAdd.vue'
import ItemsList from './views/ItemsList.vue'
import HerosAdd from './views/HerosAdd.vue'
import HerosList from './views/HerosList.vue'
import AdminUserAdd from './views/AdminUserAdd.vue'
import AdminUserList from './views/AdminUserList.vue'
import Login from './views/Login'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/', redirect: '/categories/list',
          component: CategoryList
        },
        {
          path: '/categories/list',
          name: 'CategoryList',
          component: CategoryList
        },
        {
          path: '/categories/create',
          name: 'CategoryAdd',
          component: CategoryAdd
        },
        {
          path: '/categories/edit/:id',
          name: 'CategoryAdd',
          component: CategoryAdd,
          props: true
        },
        {
          path: '/items/list',
          name: 'ItemsList',
          component: ItemsList
        },
        {
          path: '/items/create',
          name: 'ItemsAdd',
          component: ItemsAdd
        },
        {
          path: '/items/edit/:id',
          name: 'CategoryAdd',
          component: ItemsAdd,
          props: true
        },
        {
          path: '/heros/list',
          name: 'HerosList',
          component: HerosList
        },
        {
          path: '/heros/create',
          name: 'HerosAdd',
          component: HerosAdd,
          props: true
        },
        {
          path: '/heros/edit/:id',
          name: 'HerosAdd',
          component: HerosAdd,
          props: true
        },
        {
          path: '/admin_users/list',
          name: 'AdminUserList',
          component: AdminUserList,
        },
        {
          path: '/admin_users/create',
          name: 'AdminUserAdd',
          component: AdminUserAdd,
          props: true
        },
        {
          path: '/admin_users/edit/:id',
          name: 'AdminUserAdd',
          component: AdminUserAdd,
          props: true
        }
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login') 
  }
  next()
})
export default router;