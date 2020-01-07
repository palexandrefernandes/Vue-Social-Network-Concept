<template>
    <div v-if="posts">
        <Post v-for="post in posts" :post="post" user-id="1"/>
    </div>
</template>

<script>
    import Axios from 'axios';
    import Post from "../components/Post";
    import jwt from "jsonwebtoken";

    export default {
        name: "Posts",
        components: {Post},
        data() {
            return {
                posts: []
            }
        },
        mounted() {
            if(this.$store.getters.getToken == "")
                this.$router.push('/login');
            Axios.get(process.env.VUE_APP_BASE_URL + `/user/${jwt.decode(this.$store.getters.getToken).id}/posts`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken }})
            .then(res => {
                this.posts = res.data.data;
            })
            .catch(err => {
                console.log(err);
            });


        }
    }
</script>

<style scoped>

</style>