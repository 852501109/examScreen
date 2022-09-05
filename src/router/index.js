import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userInfo = sessionStorage.getItem("userInfo")
    if (!userInfo && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router;