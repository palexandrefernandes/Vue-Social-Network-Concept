<template>
    <div id="app">
        <div class="sn">
            <div id="shoutout-navbar">
                <b-navbar toggleable="lg" type="dark" variant="info">
                    <b-navbar-brand :to="!haveToken ? '/feed' : '/' ">Rice Bowl</b-navbar-brand>
                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav class="ml-auto">
                            <b-navbar-nav v-show="haveToken">
                                <b-nav-item active to="/login">Login</b-nav-item>
                                <b-nav-item active to="/signup">Signup</b-nav-item>
                            </b-navbar-nav>

                            <b-nav-item-dropdown v-show="!haveToken" right>
                                <template v-slot:button-content>
                                    <em>People</em>
                                </template>
                                <b-dropdown-item to="/users/search">Search</b-dropdown-item>
                                <b-dropdown-item to="/user/requests">Pending Follow Requests</b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown v-show="!haveToken" right>
                                <template v-slot:button-content>
                                    <em>Posts</em>
                                </template>
                                <b-dropdown-item to="/post/new">Add New</b-dropdown-item>
                                <b-dropdown-item to="/user/1/posts">My Posts</b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown v-show="!haveToken" right>
                                <template v-slot:button-content>
                                    <em>Account</em>
                                </template>
                                <b-dropdown-item to="/user/edit">Edit Informations</b-dropdown-item>
                                <b-dropdown-item :to="'/user/profile/'+ getId">Profile</b-dropdown-item>
                                <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </div>

            <div :class="$route.path === '/' ? 'container-fluid' : 'container'">
                <router-view/>
            </div>
        </div>
        <div class="footer">
            <p class="text-center">Made with
                <v-icon name="heart"></v-icon>
                by Paulo Fernandes
            </p>
            <p class="text-center">IPVC | SIR | 2019/2020</p>
            <a href="https://github.com/Hydreath/SIR_SN"><p class="text-center">Github</p></a>
        </div>
    </div>
</template>

<script>
    import jwt from 'jsonwebtoken'

    export default {
        data() {
            return {}
        },
        created() {
            this.$store.dispatch('reconnect');
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
                this.$router.push('/login');
            }
        },
        computed: {
            haveToken() {
                return this.$store.getters.getToken === "";
            },
            getId() {
                try {
                    return jwt.decode(this.$store.getters.getToken).id;
                } catch (e) {
                    return "";
                }

            }
        }
    }
</script>

<style>
    #shoutout-navbar {
        margin-bottom: 0px;
    }

    .container {
        padding: 0 5vw;
        margin-top: 50px;
    }

    .container-fluid {
        margin: 0 !important;
        padding: 0;
    }

    .footer {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
        background: #333;
        min-height: 25vh;
        color: #FFFFFF;
    }

    .sn {
        min-height: calc(75vh - 25px);
    }
</style>
