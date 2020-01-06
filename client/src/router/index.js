import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Signup from "../views/Signup";
import NewPost from "../views/NewPost";
import Posts from "../views/Posts";

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: Signup
    },
    {
        path: '/post/new',
        name: 'NewPost',
        component: NewPost
    },
    {
        path: '/user/:id/posts',
        name: 'Posts',
        component: Posts
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
