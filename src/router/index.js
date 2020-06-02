import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ShopInput from '@/views/ShopInput'
import ClientInput from '@/views/ClientInput'

Vue.use(VueRouter)

const routes = [
 {
   path: '/shop-input',
   component: ShopInput,
   name: 'ShopInput'
 },
 {
   path: '/',
   component: Home,
   name: 'Home'
 },
 {
   path: '/client-input',
   component: ClientInput,
   name: 'ClientInput'
 },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
