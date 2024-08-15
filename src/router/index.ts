import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';
import index from "../components/index.vue"
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: index,
        // children: [
        //     {
        //         path: '/',
        //         component: 
        //     }
        // ]
    }
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router