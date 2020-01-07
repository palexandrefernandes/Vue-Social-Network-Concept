<template>
    <div>
        <div v-if="!error && user !== null" v-show="user !== null">
            <user-description class="description" :user="user" :user-id="getId"/>
            <div class="posts">
                <div v-if="posts == null || posts.length > 0">
                    <Post v-for="post in posts" :post="post" :user-id="getId"/>
                </div>
                <div v-else>
                    <h3 class="text-center">{{following ? 'This user hasn\'t uploaded any images!' : 'Follow this user to check out his posts!'}}</h3>
                </div>
            </div>
        </div>
        <div v-else>
            <h3 class="text-center">This user doesn't exist!</h3>
        </div>
    </div>
</template>

<script>
    import UserDescription from "../components/UserDescription";
    import Axios from 'axios';
    import Post from "../components/Post";
    import jwt from "jsonwebtoken";

    export default {
        name: "Profile",
        components: {Post, UserDescription},
        data() {
            return {
                following: false,
                user: null,
                posts: null,
                error: false
            };
        },
        mounted() {
            if(this.$store.getters.getToken == "")
                this.$router.push('/login');
            this.getUserInfo();
            this.getPosts();
        },
        methods: {
            getUserInfo() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.$route.params.id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        console.log(res.data.data);
                        this.user = res.data.data;
                    })
                    .catch(err => {
                        this.error = true;
                    });
            },
            getPosts() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.$route.params.id}/posts`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.posts = res.data.data;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            isFollowing() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/isFollowing/${this.$route.params.id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.following = true;
                        console.log(this.following);
                    })
                    .catch(err => {
                        this.following = false;
                    });
            }
        },
        computed: {
            getId(){
                return jwt.decode(this.$store.getters.getToken).id.toString();
            }
        }
    }
</script>

<style scoped>
    .posts {

    }

    .description {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #EEE;
    }
</style>