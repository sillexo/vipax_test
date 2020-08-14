import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '../views/Profile.vue'
import Team from '../views/Team.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'profile',
        path: '/',
        components: {
            default: Profile,
        }
    },
    {
        name: 'team',
        path: '/team',
        components: {
            default: Team,
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
