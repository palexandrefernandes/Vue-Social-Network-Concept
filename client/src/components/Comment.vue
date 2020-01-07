<template>
    <div class="comment">
        <div class="comment-head">
            <div class="row" v-if="user">
                <div class="col-md-2 justify-content-center align-self-center text-center">
                    <b-img class="" fluid-grow center rounded :src="'http://localhost:3000/images/user/' + user['profile_image']"/>
                </div>
                <div class="col-md-10">
                    <router-link :to="'/user/profile/'+user['id']">{{user['name']}}</router-link>
                    <p class="small">@{{user['handle']}}</p>
                </div>
            </div>
        </div>
        <div class="comment-body">
            <p>{{comment['comment']}}</p>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';

    export default {
        name: "Comment",
        props: {
            comment: Object
        },
        data(){
            return {
                user: null
            }
        },
        mounted() {
            this.getUserInfo();
        },
        methods: {
            getUserInfo(){
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.comment.creator_id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.user = res.data.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    }
</script>

<style scoped>
    .comment{
        background: #EEE;
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    .comment-head{
        border-bottom: 1px solid #FFF;
        margin-bottom: 5px;
    }
</style>