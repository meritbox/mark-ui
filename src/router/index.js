import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import StudentInfo from "../views/StudentInfo";
import ClassInfo from "../views/ClassInfo";
import Login from "../views/Login";
import MarkManagement from "../views/MarkManagement";
import CourseSelection from "../views/CourseSelection";
import MarkDistribution from "../views/MarkDistribution";

Vue.use(VueRouter)

const routes = [
  {
    path: '/markDistribution',
    name:'MarkDistribution',
    component: MarkDistribution
  },
  {
    path:'/courseSelection',
    name:'CourseSelection',
    component: CourseSelection
  },
  {
    path:'/markManagement',
    name:'MarkManagement',
    component: MarkManagement
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path: '/classInfo',
    name: 'ClassInfo',
    component: ClassInfo
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/studentInfo',
    name: 'StudentInfo',
    component: StudentInfo
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
