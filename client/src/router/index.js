import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Signup from "../views/Signup";
import NewPost from "../views/NewPost";
import Posts from "../views/Posts";
import UserSearch from "../views/UserSearch";
import Feed from "../views/Feed";
import EditAccount from "../views/EditAccount";
import Profile from "../views/Profile";
import FollowRequests from "../views/FollowRequests";
import Index from "../views/Index";

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
    },
    {
        path: '/users/search',
        name: 'UserSearch',
        component: UserSearch
    },
    {
        path: '/feed',
        name: 'Feed',
        component: Feed
    },
    {
        path: '/user/edit',
        name: 'EditInformation',
        component: EditAccount
    },
    {
        path: '/user/profile/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/user/requests',
        name: 'Requests',
        component: FollowRequests
    },
    {
        path: '/',
        name: 'Index',
        component: Index
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
