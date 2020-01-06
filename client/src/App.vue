<template>
    <div id="app">
        <div id="shoutout-navbar">
            <b-navbar toggleable="lg" type="dark" variant="info">
                <b-navbar-brand href="#">Shoutout</b-navbar-brand>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-navbar-nav v-show="haveToken">
                            <b-nav-item active to="/login">Login</b-nav-item>
                            <b-nav-item active to="/signup">Signup</b-nav-item>
                        </b-navbar-nav>

                        <b-nav-item-dropdown v-show="!haveToken" right>
                            <template v-slot:button-content>
                                <em>Posts</em>
                            </template>
                            <b-dropdown-item to="/post/new">Add new</b-dropdown-item>
                            <b-dropdown-item to="/user/1/posts">My posts</b-dropdown-item>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown v-show="!haveToken" right>
                            <template v-slot:button-content>
                                <em>Account</em>
                            </template>
                            <b-dropdown-item to="#">Profile</b-dropdown-item>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>

        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoggedOff: false
            }
        },
        created() {
            this.$store.dispatch('reconnect');
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        },
        computed: {
            haveToken() {
                return this.$store.getters.getToken === "";

            }
        }
    }
</script>

<style>
    #shoutout-navbar {
        margin-bottom: 20px;
    }
</style>
