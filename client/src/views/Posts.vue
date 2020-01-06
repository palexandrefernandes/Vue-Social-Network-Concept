<template>
    <div v-if="posts">
        <Post v-for="post in posts" :post="post" user-id="1"/>
    </div>
</template>

<script>
    import Axios from 'axios';
    import Post from "../components/Post";

    export default {
        name: "Posts",
        components: {Post},
        data() {
            return {
                posts: null
            }
        },
        mounted() {
            console.log(this.$store.getters.getToken);

            Axios.get(process.env.VUE_APP_BASE_URL + `/user/1/posts`, {headers: {Authorization: 'Bearer ' + this.$store.getters.getToken }})
            .then(res => {
                console.log(res.data.data);
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