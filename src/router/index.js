import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('../components/home.vue')

const router = new VueRouter({
  routes: [
    { path: '/home', component: Home }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
