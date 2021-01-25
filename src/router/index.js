import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'xzry',
            component: () => import('@/view/xzry/index.vue'),
        },
        {
            path: '/zd',
            name: 'zd',
            component: () => import('@/view/zd/index.vue'),
        },
        {
            path: '/jg',
            name: 'jg',
            component: () => import('@/view/jg/index.vue'),
        },
    ]
})

export default router