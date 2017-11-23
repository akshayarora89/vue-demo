import "babel-core/register"
import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(Router)
Vue.use(VueMaterial)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
