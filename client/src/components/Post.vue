<template>
    <div v-if="userInfo !== null" v-show="active" class='post' :id="post['id']">
        <div class="row">
            <div class="col-sm-7 img-body d-flex">
                <b-img class="post-img justify-content-center align-self-center" center rounded alt="Rounded image"
                       :src="'http://localhost:3000/images/' + post['file_path']" fluid-grow/>
            </div>
            <div class="col-sm-5 post-body">
                <div v-show="showUserInfo && userInfo" class="row user-info">
                    <div class="col-md-2 d-flex justify-content-center align-self-center">
                        <b-img fluid center rounded alt="Circle image"
                               :src="'http://localhost:3000/images/user/' + userInfo.profile_image"/>
                    </div>
                    <div class="col-md-10">
                        <router-link :to="'/user/profile/'+userInfo.id">{{userInfo.name}}</router-link>
                        <p class="small">@{{userInfo.handle}}</p>
                    </div>
                </div>
                <h2>{{post['title']}}</h2>
                <p>{{post['description']}}</p>
                <h5>Comments</h5>
                <div class="comment-space">
                    <div v-if="comments.length === 0">
                        <p>Be the first to comment this post</p>
                    </div>
                    <div v-else>
                        <Comment v-for="com in comments" :comment="com"/>
                    </div>
                </div>
                <div class="d-flex justify-content-end comment-count">
                    <p>{{commentCount}}
                        <v-icon name="comment"></v-icon>
                    </p>
                </div>
                <b-form @submit="makeComment" class="comment-form">
                    <b-form-group :description="count + ' characters left'" for="input" label="New Comment">
                        <b-textarea :state="newComment.length <= 500 && newComment.length !== 0" id="input" max-rows="3"
                                    rows="3" placeholder="New Comment" required
                                    v-model="newComment" no-resize/>
                    </b-form-group>
                    <div class="d-flex justify-content-end">
                        <b-button type="submit" variant="primary">Save</b-button>
                    </div>
                </b-form>
                <div class="like-container d-flex justify-content-end">
                    <b-button @click="likePost"
                              :variant="liked ? 'danger' : 'outline-danger'">{{likesCount}}
                        <v-icon name="heart"></v-icon>
                    </b-button>
                </div>
            </div>
        </div>
        <div v-if="userId == post['creator_id']" class="creator-controls d-flex justify-content-end">
            <b-button class="" @click="deletePost">Delete</b-button>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import Comment from "./Comment";

    export default {
        name: "Post",
        components: {Comment},
        props: {
            post: Object,
            userId: String,
            showUserInfo: Boolean
        },
        data() {
            return {
                active: true,
                likesCount: 0,
                commentCount: 0,
                comments: [],
                maxCount: 500,
                newComment: "",
                liked: false,
                userInfo: null
            }
        },
        mounted() {
            this.loadComments();
            this.loadCommentCount();
            this.loadLikeCount();
            this.isLiked();
            this.getUserInfo();
        },
        methods: {
            makeComment(evt) {
                evt.preventDefault();
                Axios.post(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/comment`, {comment: this.newComment}, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.comments.push(res.data.data);
                        this.newComment = "";
                        this.commentCount += 1;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });

            },
            deletePost(evt) {
                evt.preventDefault();
                Axios.delete(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.active = false;
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            },
            loadCommentCount() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/comments/count`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.commentCount = res.data.data.count;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            loadLikeCount() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/likes/count`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.likesCount = res.data.data.count;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            isLiked() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/like`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.liked = true;
                    })
                    .catch(err => {
                        this.liked = false;
                    });
            },
            loadComments() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/comments`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.comments = res.data.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            },
            likePost() {
                if (!this.liked) {
                    Axios.post(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/like`, {}, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                        .then(res => {
                            this.liked = true;
                            this.likesCount += 1;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                } else {
                    Axios.delete(process.env.VUE_APP_BASE_URL + `/post/${this.post.id}/like`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                        .then(res => {
                            this.liked = false;
                            this.likesCount -= 1;
                        })
                        .catch(err => {
                            console.log(err.message);
                        });
                }
            },
            getUserInfo() {
                Axios.get(process.env.VUE_APP_BASE_URL + `/user/${this.post.creator_id}`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken}})
                    .then(res => {
                        this.userInfo = res.data.data;
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        },
        computed: {
            count() {
                return this.maxCount - this.newComment.length;
            }
        }
    }
</script>

<style scoped>
    .comment-count {
        margin-right: 20px;
        margin-top: 20px;
    }

    .post {
        margin-bottom: 75px;
    }

    .comment-form {
        margin-top: 10px;
    }

    .comment-space {
        overflow: scroll;
        overflow-x: hidden;
        max-height: 30vh;
        max-width: 100%;
        min-width: 100%;
    }

    .img-body {
        padding-left: 5%;
        padding-right: 5%;
    }

    .post {
        border-radius: 5px;
        border: 1px solid #EEE;
        overflow: hidden;
        -webkit-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.48);
        -moz-box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.48);
        box-shadow: 0px 14px 74px -28px rgba(0, 0, 0, 0.48);
    }

    .creator-controls {
        border-top: 1px solid #DDD;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .user-info {
        margin-bottom: 20px;
        border-bottom: 1px solid #EEE;
    }

    .img-body {
        background: #334;
    }

    .post-body, .creator-controls {
        padding: 40px;
    }

    .like-container {
        padding-top: 20px;
    }

    .post-img {
        -webkit-box-shadow: 10px 10px 112px -39px rgba(0, 0, 0, 0.9);
        -moz-box-shadow: 10px 10px 112px -39px rgba(0, 0, 0, 0.9);
        box-shadow: 10px 10px 112px -39px rgba(0, 0, 0, 0.9);
    }

    .user-image{
        max-width:100%;
        max-height:100%;
    }

</style>