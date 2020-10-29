import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import AdminStats from '../views/PollsStats.vue'
import QuestionStats from '../views/QuestionsStats.vue'
import UserStats from '../views/UserStats.vue'
import MyStats from '../views/MyStats.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/poll-stats',
        name: 'AdminStats',
        component: AdminStats,
    },
    {
        path: '/question-stats',
        name: 'QuestionsStats',
        component: QuestionStats,
    },
    {
        path: '/user-stats',
        name: 'UserStats',
        component: UserStats,
    },
    {
        path: '/my-stats',
        name: 'MyStats',
        component: MyStats,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
