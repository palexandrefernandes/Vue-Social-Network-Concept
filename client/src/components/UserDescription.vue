<template>
    <div class="user-card">
        <div class="row">
            <div class="col-md-2">
                <b-img fluid center rounded
                       :src="'http://localhost:3000/images/user/' + user['profile_image']"/>
            </div>
            <div class="col-md-10">
                <div class="row info">
                    <div class="col-md-10">
                        <router-link :to="'/user/profile/' + user['id']"><h3>{{user['name']}}</h3></router-link>
                        <p>@{{user['handle']}}</p>
                    </div>
                    <div class="col-md-2">
                        <b-button @click="follow" v-if="userId != user['id']" :variant="following || pending ? 'primary' : 'outline-primary'">
                            {{state}}
                        </b-button>
                    </div>
                </div>
                    <p>{{user['description']}}</p>
                    <p>Followers: {{followerCount}} | Following: {{followingCount}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "UserDescription",
        props: {
            user: Object,
            userId: String
        },
        data() {
            return {
                following: false,
                pending: false,
                followerCount: 0,
                followingCount: 0
            }
        },
        mounted() {
            this.isFollowing();
            this.isPending();
            this.getFollowerCount();
            this.getFollowingCount();
        },
        methods: {
            isFollowing() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/isFollowing/${this.user['id']}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.following = true;
                        console.log(this.following);
                    })
                    .catch(err => {
                        this.following = false;
                    });
            },
            isPending() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/isPending/${this.user['id']}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.pending = true;
                        console.log(this.pending);
                    })
                    .catch(err => {
                        this.pending = false;
                    });
            },
            follow() {
                if (!this.following && !this.pending) {
                    Axios.post(process.env.VUE_APP_BASE_URL + `/user/${this.user['id']}/follow`, {}, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                        .then(res => {
                            if(this.user.public){
                                this.following = true;
                                this.pending = false;
                            }
                            else{
                                this.following = false;
                                this.pending = true;
                            }
                            this.followerCount += 1;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                } else {
                    Axios.delete(process.env.VUE_APP_BASE_URL + `/user/${this.user['id']}/unfollow`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                        .then(res => {
                            this.following = false;
                            this.pending = false;
                            this.followerCount -= 1;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                }
            },
            getFollowerCount() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.user['id']}/followers/count`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.followerCount = res.data.data.follower_count;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            getFollowingCount() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.user['id']}/following/count`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.followingCount = res.data.data.following_count;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        },
        computed: {
            state(){
                if(this.following)
                    return 'Unfollow';
                if(this.pending)
                    return 'Pending';

                return 'Follow';
            }
        }
    }
</script>

<style scoped>
    .info {
        margin-bottom: 10px;
        border-bottom: 1px solid #EEE;
    }

    .user-card>div{
        padding: 20px;
    }

    .user-card{
        margin-top: 5px;
        border-radius: 5px;
        border: 1px solid #EEE;
        padding: 20px;
        margin-bottom: 3vh;

        min-height: 20vh;

        -webkit-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.2);
        box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.2);
    }
</style>