<template>
    <div>
        <h4>Following Requests</h4>
        <div v-if="user !== null">
            <div class="row request-item" v-show="!accepted">
                <div class="col-md-2 justify-content-center align-self-center">
                    <b-img fluid center rounded alt="Circle image"
                           :src="'http://localhost:3000/images/user/' + user.profile_image"/>
                </div>
                <div class="col-md-7 justify-content-center align-self-center">
                    <router-link :to="'/user/profile/'+user.id"><h3>{{user.name}}</h3></router-link>
                    <p class="small">@{{user.handle}}</p>
                </div>
                <div class="buttons col-md-3 justify-content-center align-self-center">
                    <b-button variant="danger" @click="deny">Delete</b-button>
                    <b-button variant="primary" @click="accept">Accept</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: "FollowRequest",
        props: {
            follow: Object
        },
        data() {
            return {
                user: null,
                accepted: false
            };
        },
        mounted() {
            this.getUserData();
        },
        methods: {
            getUserData() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.follow.followed_by_id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.user = res.data.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            deny(evt) {
                evt.preventDefault();
                Axios.delete(process.env.VUE_APP_BASE_URL + `/user/${this.user.id}/deny`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.accepted = true;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });


            },
            accept(evt) {
                evt.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + `/user/${this.user.id}/accept`, {}, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.accepted = true;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    }
</script>

<style scoped>
    .request-item {
        margin-top: 20px;
        border-radius: 5px;
        border: 1px solid #EEE;
        overflow: hidden;
        -webkit-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.10);
        -moz-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.10);
        box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.10);
    }

    .buttons > button {
        margin-right: 5px;
    }

</style>