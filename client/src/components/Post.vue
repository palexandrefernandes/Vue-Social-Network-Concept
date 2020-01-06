<template>
    <div v-show="active" class='post' :id="post['id']" @click="onClick">
        <div class="row">
            <div class="col-md-8 img-body">
                <b-img :src="'http://localhost:3000/images/' + post['file_path']" fluid-grow/>
            </div>
            <div class="col-md-4 post-body">
                <h2>{{post['title']}}</h2>
                <p>{{post['description']}}</p>
            </div>
        </div>
        <b-button v-if="userId == post['creator_id']" class="" @click="deletePost">Delete</b-button>
    </div>
</template>

<script>
    import Axios from 'axios';
    export default {
        name: "Post",
        props: {
            post: Object,
            userId: Number
        },
        data(){
            return{
                active: true
            }
        },
        methods: {
            onClick(evt){
                evt.preventDefault();
                console.log(evt.currentTarget.id);
            },
            deletePost(evt){
                evt.preventDefault();
                Axios.delete(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken }})
                .then(res => {
                    this.active = false;
                })
                .catch(err => {
                    console.log(err.message);
                })
            }
        }
    }
</script>

<style scoped>
    .img-body{
        padding-left: 5%;
        padding-right: 5%;
    }

    .post{
        border-radius: 5px;
        border: 1px solid #EEE;
        padding: 20px;
        -webkit-box-shadow: 0px 14px 74px -28px rgba(0,0,0,0.48);
        -moz-box-shadow: 0px 14px 74px -28px rgba(0,0,0,0.48);
        box-shadow: 0px 14px 74px -28px rgba(0,0,0,0.48);
    }

</style>