import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import ShopInput from '@/views/ShopInput'
import ClientInput from '@/views/ClientInput'
import ViewerInput from '@/views/ViewerInput'
import ShopsList from '@/views/ShopsList'
import ClientsList from '@/views/ClientsList'
import Shop from '@/views/Shop'
import Client from '@/views/Client'

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
 {
   path: '/viewer-input',
   component: ViewerInput,
   name: 'ViewerInput'
 },
 {
   path: '/shops-list',
   component: ShopsList,
   name: 'ShopsList'
 },
 {
   path: '/shop/:shop_id',
   component: Shop,
   name: 'Shop'
 },
 {
   path: '/clients-list',
   component: ClientsList,
   name: 'ClientsList'
 },
 {
   path: '/client/:client_id',
   component: Client,
   name: 'Client'
 },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
