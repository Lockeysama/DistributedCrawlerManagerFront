import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from './views/Login/Login.vue'
import Layout from './components/Layout/Layout.vue'
import Home from './views/Home/Home.vue'
import Workers from './views/Workers/Workers.vue'
import Configuration from './views/Configuration/Configuration.vue'
import ModulesCrawler from './views/Modules/ModulesCrawler.vue'
import ModulesWSCrawler from './views/Modules/ModulesWSCrawler.vue'
import ModulesParser from './views/Modules/ModulesParser.vue'
import TaskTiming from './views/Task/TaskTiming.vue'
import TaskKeep from './views/Task/TaskKeep.vue'
import Proxies from './views/Proxies/Proxies.vue'
import MonitorWorkers from './views/Monitor/MonitorWorkers.vue'
import MonitorTask from './views/Monitor/MonitorTask.vue'
import MonitorEvent from './views/Monitor/MonitorEvent.vue'
import Wedis from './views/Wedis/Wedis.vue'

const router = new Router({
  mode: 'hash',
  routes: [
    {path: '/Login', component: Login },
    {path: '/', redirect: '/Home' },
    {
      path: '/Home', 
      component: Layout, 
      children: [
        {path: '/Home', component: Home, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Workers', 
      component: Layout, 
      children: [
        {path: '/Workers', component: Workers, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Configuration', 
      component: Layout, 
      children: [
        {path: '/Configuration', component: Configuration, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Modules/Crawler', 
      component: Layout, 
      children: [
        {path: '/Modules/Crawler', component: ModulesCrawler, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Modules/WSCrawler', 
      component: Layout, 
      children: [
        {path: '/Modules/WSCrawler', component: ModulesWSCrawler, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Modules/Parser', 
      component: Layout, 
      children: [
        {path: '/Modules/Parser', component: ModulesParser, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Task/Timing', 
      component: Layout, 
      children: [
        {path: '/Task/Timing', component: TaskTiming, meta: {requireAuth: true}}
      ]
    },{
      path: '/Task/Keep', 
      component: Layout, 
      children: [
        {path: '/Task/Keep', component: TaskKeep, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Proxies', 
      component: Layout, 
      children: [
        {path: '/Proxies', component: Proxies, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Monitor/Workers', 
      component: Layout, 
      children: [
        {path: '/Monitor/Workers', component: MonitorWorkers, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Monitor/Task', 
      component: Layout, 
      children: [
        {path: '/Monitor/Task', component: MonitorTask, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Monitor/Event', 
      component: Layout, 
      children: [
        {path: '/Monitor/Event', component: MonitorEvent, meta: {requireAuth: true}}
      ]
    },
    {
      path: '/Wedis', 
      component: Layout, 
      children: [
        {path: '/Wedis', component: Wedis, meta: {requireAuth: true}}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (router.app.$store.state.token) {
      next();
    }
    else {
      next({
        path: '/Login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
